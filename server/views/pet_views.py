from flask import Blueprint, jsonify
from models import db,Pet

pet_bp = Blueprint("pet_bp", __name__)

# Fetch all Pets
@pet_bp.route('/pets', methods=['GET'])
def get_all_Pets():
    pets_list = []
    pets = Pet.query.all()

    for pet in pets:
        pet_data = {
            'id': pet.id,
            'image_url':pet.image_url,
            'name': pet.name,
            'age': pet.age,
            'gender': pet.gender,
            'price': pet.price,
        }
        pets_list.append(pet_data)
    return jsonify(pets_list), 200


#fetch a single pet
@pet_bp.route('/pets/<int:id>', methods=['GET'])
def get_pet_by_id(id):
    pet = Pet.query.get(id)
    
    if pet is None:
        return jsonify({'error': 'pet not found'}), 404

    pet_data = {
        'id': pet.id,
        'image_url':pet.image_url,
        'name': pet.name,
        'gender': pet.gender,
        'price': pet.price,
        'age': pet.age,
    }
    return jsonify(pet_data), 200