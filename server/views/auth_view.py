from models import db, User, TokenBlocklist
from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, get_jwt
from werkzeug.security import check_password_hash

auth_bp = Blueprint('auth_bp', __name__)

# Login a user
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    
    user = User.query.filter_by(username = username).first()
    
    if user:
        if check_password_hash(user.password, password):
            access_token = create_access_token(identity = user.id)
            return jsonify(access_token = access_token)

        return jsonify({"error": "Wrong password!"}), 401
    
    else:
        return jsonify({"error": "User does not exist!"}), 404
    

# Get logged in user
@auth_bp.route("/authenticated_user", methods=["GET"])
@jwt_required()
def authenticated_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user:
        user_data = {
            "id": user.id,
            "username": user.username,
            "phone_number": user.Phone_number,
            "email": user.email
        }
        return jsonify(user_data), 200
    else:
        return jsonify({"error": "User not found!"}), 404


# Logout user
@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jwt = get_jwt()
    
    jti = jwt['jti']
        
    token_b = TokenBlocklist(jti = jti)
    db.session.add(token_b)
    db.session.commit()
    
    return jsonify({"success": "Logged out successfully!"}), 200