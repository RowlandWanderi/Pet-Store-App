from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), )
    email = db.Column(db.String,)
    phone_number = db.Column(db.Integer, )
    profile_image_url = db.Column(db.String, )  # Image URL
    password = db.Column(db.String(450), unique=False, )
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    
    # Relationships
    pets = db.relationship('Pet', back_populates='user', lazy=True, cascade='all, delete-orphan')
    reviews = db.relationship('Review', back_populates='user', lazy=True, cascade='all, delete-orphan')
    
    
    #validate the users email to have an @
    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError("Invalid email address. Must contain '@'.")
        return email


    
    
    
#   For Logout JWT Block List
class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti =  db.Column(db.String(100),nullable=True)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)

class Pet(db.Model):
    
    __tablename__ = 'pets'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), )
    gender = db.Column(db.String, )
    price = db.Column(db.Integer, )
    age = db.Column(db.Integer, )
    image_url = db.Column(db.String, )  # Image URL column
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), )
    pet_store_id = db.Column(db.Integer, db.ForeignKey('pet_stores.id'), )
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    # Relationships
    user = db.relationship('User', back_populates='pets', lazy=True)
    pet_store = db.relationship('PetStore', back_populates='pets', lazy=True,)

class Review(db.Model):
    
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    Rating = db.Column(db.Integer, )
    Comments = db.Column(db.String, )
    pet_store_id = db.Column(db.Integer, db.ForeignKey('pet_stores.id'), )
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), )
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    # Relationships
    pet_store = db.relationship('PetStore', back_populates='reviews', lazy=True,)
    user = db.relationship('User', back_populates='reviews', lazy=True)

class PetStore(db.Model):
    
    __tablename__ = 'pet_stores'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, )
    location = db.Column(db.String, )
    phone_number = db.Column(db.Integer, )
    email = db.Column(db.String, )
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    
    
    # Relationships
    reviews = db.relationship('Review', back_populates='pet_store', lazy=True, cascade='all, delete-orphan')
    pets = db.relationship('Pet', back_populates='pet_store', lazy=True, cascade='all, delete-orphan')
