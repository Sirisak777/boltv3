# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # อนุญาตให้ frontend (localhost:5173) เรียก API ได้

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    menu = data.get('menu')
    date = data.get('date')

    # จำลองการทำนาย: ใส่ logic จริงของคุณได้ตรงนี้
    prediction = len(menu) * 10  # สมมุติทำนายจากความยาวชื่อเมนู

    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
