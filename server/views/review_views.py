from models import db,Review,User,PetStore
from flask import Blueprint, jsonify, request,make_response
from flask_jwt_extended import  jwt_required, get_jwt_identity


review_bp = Blueprint('review_bp', __name__)

#fetch all reviews 
@review_bp.route('/reviews', methods=['GET'])

def get_all_reviews():
    reviews = Review.query.all()
    reviews_data = [
        {
            'id': review.id,
            'rating': review.Rating,
            'comments': review.Comments,
            'pet_store_id': review.pet_store_id,
            'user': {
                'id': review.user.id,
                'username': review.user.username,
                'email': review.user.email,
                'phone_number': review.user.phone_number,
            }
        }
        for review in reviews
    ]
    response = make_response(
        jsonify(reviews_data), 200
    )
    return response

# Create a new review for a pet store
@review_bp.route('/reviews', methods=['POST'])
@jwt_required()
def create_review():
    data = request.get_json()

    # Ensure required fields are present in the request
    if 'Rating' not in data or 'Comments' not in data or 'user_id' not in data or 'pet_store_id' not in data:
        return make_response(jsonify({'error': 'Missing required fields in the request'}), 400)

    Rating = data('Rating')
    Comments = data('Comments')
    user_id = get_jwt_identity()
    pet_store_id = data('pet_store_id')

    # Check if the user and pet store exist
    user = User.query.get(user_id)
    pet_store = PetStore.query.get(pet_store_id)

    if not user or not pet_store:
        return make_response(jsonify({'error': 'User or pet store not found'}), 404)

    # Create a new review
    new_review = Review(Rating=Rating, Comments=Comments, user=user, pet_store=pet_store)
    db.session.add(new_review)
    db.session.commit()

    response_data = {
        'id': new_review.id,
        'Rating': new_review.Rating,
        'Comments': new_review.Comments,
        'pet_store_id': new_review.pet_store_id,
        'user_id': new_review.user_id,

    }

    return make_response(jsonify(response_data), 201)


# Update a review for a pet store
@review_bp.route('/reviews/<int:review_id>', methods=['PUT'])
@jwt_required()
def update_review(review_id):
    data = request.get_json()

    # Ensure required fields are present in the request
    if 'Rating' not in data or 'Comments' not in data:
        return make_response(jsonify({'error': 'Missing required fields in the request'}), 400)

    Rating = data('Rating')
    Comments = data('Comments')

    # Check if the review exists
    existing_review = Review.query.get(review_id)

    if not existing_review:
        return make_response(jsonify({'error': 'Review not found'}), 404)

    else:
        #check if the user is logged in to update the review
        if existing_review.user_id == get_jwt_identity():
            # Update the review
            existing_review.Rating = Rating
            existing_review.Comments = Comments
            db.session.commit()

            response_data = {
                'id': existing_review.id,
                'Rating': existing_review.Rating,
                'Comments': existing_review.Comments,
                'pet_store_name': existing_review.pet_store.name,
                'user_username': existing_review.user.username,
            }

            return make_response(jsonify(response_data), 200)
        
        else:
            return jsonify({"error": "You are trying to update someone's review!"}), 404
        
    

# Delete a review for a pet store
@review_bp.route('/reviews/<int:review_id>', methods=['DELETE'])
@jwt_required()
def delete_review(review_id):
    # Check if the review exists
    existing_review = Review.query.get(review_id)

    if not existing_review:
        return make_response(jsonify({'error': 'Review not found'}), 404)

    else:
         #check if the user is logged in to delete the review
        if existing_review.user_id == get_jwt_identity():
            # Delete the review
            db.session.delete(existing_review)
            db.session.commit()

            return make_response(jsonify({'message': 'Review deleted successfully'}), 200)
        else:
            return jsonify({"error": "You are trying to delete someone's review!"}), 404
        