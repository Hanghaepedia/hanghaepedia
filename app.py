from flask import Flask, render_template, request, redirect, url_for
from bs4 import BeautifulSoup # 크롤링 라이브러리
import requests # HTTP 요청 라이브러리
app = Flask(__name__)

import os
from flask_sqlalchemy import SQLAlchemy

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

def __init__(self, userName, userId, password):
    self.userName = userName
    self.userId = userId
    self.password = password
def __repr__(self):
    return "<TbTest('%d', '%s', '%s'>" %(self.id, self.userName, self.userId, self.password)
    
with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return render_template("index.html")

# 회원가입 데이터 양식 받기.
@app.route('/api/user', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['user_name']
        userid = request.form['user_id']
        password = request.form['user_password']

        # 사용자가 이미 존재하는지 확인
        existing_user = User.query.filter_by(userName=username).first()
        if existing_user:
            return '이미 존재하는 사용자입니다!'
        
        # 새로운 사용자 생성
        new_user = User(userName=username, userId=userid, password=password)

        # 데이터베이스에 추가
        db.session.add(new_user)
        db.session.commit()
        
if __name__ == "__main__":
    app.run(debug=True)