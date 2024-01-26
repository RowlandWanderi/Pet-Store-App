from datetime import timedelta
from models import db, User,Pet,PetStore,Review, TokenBlocklist
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
import random
import string
from views import *

def generate_secret_key(length=32):
    characters = string.ascii_letters + string.digits
    secret_key = ''.join(random.choice(characters) for i in range(length))
    return secret_key

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(pet_store_bp)
app.register_blueprint(review_bp)
app.register_blueprint(user_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(pet_bp)

jwt = JWTManager()
app.config["JWT_SECRET_KEY"] =  generate_secret_key()
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)
jwt.init_app(app)

@jwt.token_in_blocklist_loader
def token_in_blocklist_callback(jwt_header, jwt_data):
    jti = jwt_data['jti']
    token = TokenBlocklist.query.filter_by(jti=jti).first()
    if token:
        return token 
    else:
        return None
    
if __name__ == '__main__':
    # app.run(port=5000, debug=True)
    from waitress import serve
    serve(app, host="0.0.0.0", port=5000)
