from flask import Flask, render_template, request, redirect, url_for,  jsonify
from bs4 import BeautifulSoup # 크롤링 라이브러리

import os
from flask_sqlalchemy import SQLAlchemy

import requests # HTTP 요청 라이브러리
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

<<<<<<< HEAD
# 회원가입 데이터 양식 받기.
@app.route('/api/user', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['user_name']
        userid = request.form['user_id']
        password = request.form['user_password']
=======
# 회원가입
@app.route('/api/signup', methods=['POST'])
def api_signup():
    userName = request.form['userName']
    userId = request.form['userId']
    password = request.form['password']
>>>>>>> develop

        # 사용자가 이미 존재하는지 확인
        existing_user = User.query.filter_by(userName=username).first()
        if existing_user:
            return '이미 존재하는 사용자입니다!'
        
        # 새로운 사용자 생성
        new_user = User(userName=username, userId=userid, password=password)

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

        # token을 줍니다.
        return jsonify({'result': 'success', 'token': token})
    # 찾지 못하면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디 / 비밀번호가 일치하지 않습니다.'})
    

# @app.route('/api/nick', methods=['GET'])
# def api_valid():
#     token_receive = request.cookies.get('mytoken')

#     # try / catch 문?
#     # try 아래를 실행했다가, 에러가 있으면 except 구분으로 가란 얘기입니다.

#     try:
#         # token을 시크릿키로 디코딩합니다.
#         # 보실 수 있도록 payload를 print 해두었습니다. 우리가 로그인 시 넣은 그 payload와 같은 것이 나옵니다.
#         payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
#         print(payload)

#         # payload 안에 id가 들어있습니다. 이 id로 유저정보를 찾습니다.
#         # 여기에선 그 예로 닉네임을 보내주겠습니다.
#         userinfo = db.user.find_one({'id': payload['id']}, {'_id': 0})
#         return jsonify({'result': 'success', 'nickname': userinfo['nick']})
#     except jwt.ExpiredSignatureError:
#         # 위를 실행했는데 만료시간이 지났으면 에러가 납니다.
#         return jsonify({'result': 'fail', 'msg': '로그인 시간이 만료되었습니다.'})
#     except jwt.exceptions.DecodeError:
#         return jsonify({'result': 'fail', 'msg': '로그인 정보가 존재하지 않습니다.'})
    
if __name__ == "__main__":
    app.run(debug=True)