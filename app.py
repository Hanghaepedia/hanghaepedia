from flask import Flask, render_template, request, jsonify

import os
from flask_sqlalchemy import SQLAlchemy

import jwt
import datetime
import hashlib

SECRET_KEY = 'SPARTA'

app = Flask(__name__)


basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + os.path.join(basedir, 'database.db')
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(100), nullable=False)
    userId = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)

with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return render_template("index.html")

# 회원가입
@app.route('/api/signup', methods=['POST'])
def api_signup():
    userName = request.form['userName']
    userId = request.form['userId']
    password = request.form['password']

    pwHash = hashlib.sha256(password.encode('utf-8')).hexdigest()

    # 새로운 사용자 생성
    new_user = User(userName = userName, userId = userId, password = pwHash)

    # 데이터베이스에 추가
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'result': 'success'})

# 로그인
@app.route('/api/login', methods=['POST'])
def api_login():
    userId = request.form['userId']
    password = request.form['password']
    
    pwHash = hashlib.sha256(password.encode('utf-8')).hexdigest()

    result = User.query.filter_by(userId=userId, password=pwHash).first()

    if result is not None:
        payload = {
            'userId': userId,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=5)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256').decode('utf-8')

        return jsonify({'result': 'success', 'token': token})
    else:
        return jsonify({'result': 'fail', 'msg': '아이디 / 비밀번호가 일치하지 않습니다.'})
    
if __name__ == "__main__":
    app.run(debug=True)