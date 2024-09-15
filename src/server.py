from flask import Flask, request, jsonify
import google.generativeai as genai
from PIL import Image

app = Flask(__name__)

genai.configure(api_key="AIzaSyAJ-pysce8vOu8ojBENvxd1hirBgNFljwc")

@app.route('/generate-text', methods=['POST'])
def generate_text():
    print('request',request)
    # img = request.files['image']
    # img = Image.open(img)
    # model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    # response = model.generate_content(["Spot the differences in the two forms?", img])
    # print(response)
    return jsonify({'text': "response.text"})

if __name__ == '__main__':
    app.run(debug=True)