from models import db,PetStore
from flask import Blueprint, jsonify, request,make_response


pet_store_bp = Blueprint('pet_store_bp', __name__)

#fecth all pet stores
@pet_store_bp.route('/petstores', methods=['GET'])
def get_all_pet_stores():
    pet_stores = PetStore.query.all()
    petstore_list = []
    
    for petstore in pet_stores:
        petstore_data = {
            'id': petstore.id,
            'name': petstore.name,
            'location': petstore.location,
            'phone_number': petstore.phone_number,
            'email':petstore.email,
            
            'pets': [
                {
                    'id':pet.id,
                    'name':pet.name,
                    'species':pet.species,
                    'price' : pet.price,
                    'age' : pet.age,
                    'image_url': pet.image_url,
                } 
                for pet in petstore.pets],
            'reviews' : [
                {
                    'rating': review.rating,
                    'comments': review.comments,
                }
                for review in petstore.reviews
            ]
        }
        petstore_list.append(petstore_data)
    response = make_response(
        jsonify(petstore_list),200
    )
    return response


# Fetch a pet store by ID with its pets and reviews
@pet_store_bp.route('/petstores/<int:petstore_id>', methods=['GET'])
def get_pet_store_by_id(petstore_id):
    petstore = PetStore.query.get_or_404(petstore_id)
    petstore_data = {
        'id': petstore.id,
        'name': petstore.name,
        'location': petstore.location,
        'phone_number': petstore.phone_number,
        'email': petstore.email,
        'pets': [
            {
                'id': pet.id,
                'name': pet.name,
                'species': pet.species,
                'price': pet.price,
                'age': pet.age,
            }
            for pet in petstore.pets
        ],
        'reviews': [
            {
                'rating': review.rating,
                'comments': review.comments,
                'user': {
                    'id': review.user.id,
                    'username': review.user.username,
                    'email': review.user.email,
                    
                }
            }
            for review in petstore.reviews
        ]
    }
    response = make_response(
        jsonify(petstore_data), 200
    )
    return response