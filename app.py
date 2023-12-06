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

if __name__ == "__main__":
    app.run(debug=True)