import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  CircularProgress,
  Alert,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ExtractIcon from '@mui/icons-material/Description';
import ClassifyIcon from '@mui/icons-material/Category';
import SignatureIcon from '@mui/icons-material/VerifiedUser';
import AnalysisIcon from '@mui/icons-material/Analytics';
import CompareIcon from '@mui/icons-material/Compare';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from 'react-router-dom';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY);
// Custom prompts for each task
const taskPrompts = {
  'information extraction': `Analyze this document image and extract key information. 
    Identify and list important details such as names, dates, amounts, and any other 
    relevant data. Present the extracted information in a structured format.`,
  
  'document classification': `Examine this document image and determine its type or category. 
    Consider features such as layout, content, and any visible headers or logos.
    Provide your short classification along with a brief explanation of your reasoning.`,
  
  'signature detection': `Inspect this document image for any signatures. 
    If present, give it assignature presence: Yes/No and also describe the location of the signature(s) within the document. 
    Comment on any notable characteristics of the signature(s) without attempting to identify specific individuals.`,
  
  'comprehensive analysis': `Perform a comprehensive analysis of this document image. 
    1. Extract key information such as names, dates, amounts, and other relevant data.
    2. Classify the document type and explain your reasoning.
    3. Detect and describe any signatures present.
    4. Provide any additional observations or insights about the document.
    
    Present your analysis as a JSON object with the following structure:
    {
      "informationExtraction": {
        // Key-value pairs of extracted information
      },
      "documentClassification": {
        "type": "",
        "reasoning": ""
      },
      "signatureDetection": {
        "present": true/false,
        "description": ""
      },
      "additionalObservations": ""
    }
    Ensure the JSON is valid and properly formatted.`,

  'image comparison': `Compare the two provided images and provide the following analysis:
    1. Calculate a similarity score between 0 and 100, where 0 is completely different and 100 is identical.
    2. Describe the main similarities between the images.
    3. Highlight the key differences between the images.
    4. Provide any additional observations or insights about the comparison.

    Present your analysis as a JSON object with the following structure:
    {
      "similarityScore": 0,
      "similarities": "",
      "differences": "",
      "additionalObservations": ""
    }
    Ensure the JSON is valid and properly formatted.`
};

const TaskCard = ({ title, description, onClick, icon: Icon }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={onClick}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Icon sx={{ fontSize: 40, mb: 2 }} />
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );

const DemoPage = () => {
  const [files, setFiles] = useState({ file1: null, file2: null });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [previewUrls, setPreviewUrls] = useState({ url1: null, url2: null });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAttempts = localStorage.getItem('demoAttempts');
    if (storedAttempts) {
      setAttempts(parseInt(storedAttempts));
    }
  }, []);

  const handleFileChange = (event, fileKey) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFiles(prevFiles => ({ ...prevFiles, [fileKey]: selectedFile }));
      
      // Create a blob URL for the preview
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrls(prevUrls => ({ 
        ...prevUrls, 
        [fileKey === 'file1' ? 'url1' : 'url2']: objectUrl 
      }));
    }
  };

  useEffect(() => {
    // Clean up object URLs when component unmounts
    return () => {
      if (previewUrls.url1) URL.revokeObjectURL(previewUrls.url1);
      if (previewUrls.url2) URL.revokeObjectURL(previewUrls.url2);
    };
  }, []);

  const handleTaskClick = (task) => {
    if (attempts >= 25) {
      setShowUpgradeDialog(true);
    } else {
      setSelectedTask(task);
      setIsDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setFiles({ file1: null, file2: null });
    
    // Revoke object URLs when closing dialog
    if (previewUrls.url1) URL.revokeObjectURL(previewUrls.url1);
    if (previewUrls.url2) URL.revokeObjectURL(previewUrls.url2);
    
    setPreviewUrls({ url1: null, url2: null });
    setResult(null);
    setError(null);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    if (attempts >= 25) {
      setShowUpgradeDialog(true);
      return;
    }

    if ((!files.file1 || (selectedTask === 'image comparison' && !files.file2)) || !selectedTask) {
      setError('Please select the required file(s) and a task.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = taskPrompts[selectedTask];

      const content = [prompt];

      // Add file1 to content
      const base64Image1 = await fileToBase64(files.file1);
      content.push({
        inlineData: {
          data: base64Image1,
          mimeType: files.file1.type
        }
      });

      // For image comparison, add file2 to content
      if (selectedTask === 'image comparison') {
        const base64Image2 = await fileToBase64(files.file2);
        content.push({
          inlineData: {
            data: base64Image2,
            mimeType: files.file2.type
          }
        });
      }

      const result = await model.generateContent(content);
      const response = await result.response;
      const text = response.text();
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem('demoAttempts', newAttempts.toString());
      try {
        const jsonResult = JSON.parse(text);
        setResult(JSON.stringify(jsonResult, null, 2));
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        setResult(text);
      }
      

    } catch (e) {
      setError('An error occurred while processing your request. Please try again.');
      console.error('Error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = () => {
    // Redirect to upgrade page or open upgrade modal
    console.log("Redirecting to upgrade page");
    // For now, we'll just navigate to a hypothetical upgrade page
    navigate('/signin');
  };
  
  const handleLogin = () => {
    // Redirect to login page or open login modal
    console.log("Redirecting to login page");
    // For now, we'll just navigate to a hypothetical login page
    navigate('/login');
  };
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  const tasks = [
    { title: 'Information Extraction', description: 'Extract key information from documents', id: 'information extraction', icon: ExtractIcon },
    { title: 'Document Classification', description: 'Determine the type or category of a document', id: 'document classification', icon: ClassifyIcon },
    { title: 'Signature Detection', description: 'Detect and describe signatures in documents', id: 'signature detection', icon: SignatureIcon },
    { title: 'Comprehensive Analysis', description: 'Perform a full analysis of the document', id: 'comprehensive analysis', icon: AnalysisIcon },
    { title: 'Image Comparison', description: 'Compare two images and provide similarity analysis', id: 'image comparison', icon: CompareIcon },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Documatic Demo
        </Typography>
        <Typography variant="body1" paragraph align="center">
          Choose a task to see our intelligent document processing in action. 
          You have {5 - attempts} attempts remaining.
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={3} key={task.id}>
              <TaskCard
                title={task.title}
                description={task.description}
                onClick={() => handleTaskClick(task.id)}
                icon={task.icon}
              />
            </Grid>
          ))}
        </Grid>

        <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
          <DialogTitle>{selectedTask && tasks.find(t => t.id === selectedTask).title}</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              {/* Left side: Upload and Preview */}
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 2 }}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="contained-button-file-1"
                    type="file"
                    onChange={(e) => handleFileChange(e, 'file1')}
                  />
                  <label htmlFor="contained-button-file-1">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                      fullWidth
                    >
                      Upload Document 1
                    </Button>
                  </label>
                  {files.file1 && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Selected file 1: {files.file1.name}
                    </Typography>
                  )}
                </Box>

                {selectedTask === 'image comparison' && (
                  <Box sx={{ mb: 2 }}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="contained-button-file-2"
                      type="file"
                      onChange={(e) => handleFileChange(e, 'file2')}
                    />
                    <label htmlFor="contained-button-file-2">
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        fullWidth
                      >
                        Upload Document 2
                      </Button>
                    </label>
                    {files.file2 && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Selected file 2: {files.file2.name}
                      </Typography>
                    )}
                  </Box>
                )}
                { console.log(previewUrls.url1) }
                {previewUrls.url1 && (
                  <Card sx={{ mb: 3 }}>
                    <CardMedia
                      component="img"
                      image={previewUrls.url1}
                      alt="Uploaded document 1 preview"
                      sx={{ maxHeight: 200, objectFit: 'contain' }}
                    />
                  </Card>
                )}

                {selectedTask === 'image comparison' && previewUrls.url2 && (
                  <Card sx={{ mb: 3 }}>
                    <CardMedia
                      component="img"
                      image={previewUrls.url2}
                      alt="Uploaded document 2 preview"
                      sx={{ maxHeight: 200, objectFit: 'contain' }}
                    />
                  </Card>
                )}
              </Grid>

              {/* Right side: Processing Result */}
              <Grid item xs={12} md={6}>
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                <Paper elevation={3} sx={{ p: 2, height: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  {isLoading ? (
                    <Box sx={{  p:4,textAlign: 'center' }}>
                      <CircularProgress />
                      <Typography variant="body1" sx={{ mt: 2 }}>
                        Processing document...
                      </Typography>
                    </Box>
                  ) : result ? (
                    <>
                      <Typography variant="h6" gutterBottom>
                        Processing Result:
                      </Typography>
                      <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', width: '100%' }}>
                        {result}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="body1">
                      Upload document(s) and click "Process Document" to see the results.
                    </Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
            <Button onClick={handleSubmit} disabled={isLoading || (!files.file1 || (selectedTask === 'image comparison' && !files.file2))}>
              {isLoading ? 'Processing...' : 'Process Document'}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={showUpgradeDialog} onClose={() => setShowUpgradeDialog(false)}>
          <DialogTitle>Demo Limit Reached</DialogTitle>
          <DialogContent>
            <Typography>
              You have reached the maximum number of demo attempts. 
              Please log in or upgrade to paid version.Reach out to abc@gmail.com
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowUpgradeDialog(false)}>Cancel</Button>
            <Button onClick={handleLogin} color="primary">Log In</Button>
            <Button onClick={handleUpgrade} color="secondary" variant="contained">
              Upgrade
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default DemoPage;
