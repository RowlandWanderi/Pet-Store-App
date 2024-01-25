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

    new_review = Review(
        Rating = data.get('Rating'),
        Comments = data.get('Comments'),
        user_id = get_jwt_identity(),
        pet_store_id = data.get('pet_store_id')
        
    )

    db.session.add(new_review)
    db.session.commit()
    
    # Fetch the created review with user information
    created_review = Review.query.filter_by(id=new_review.id).first()

    response_data = {
        'id': created_review.id,
        'Rating': created_review.Rating,
        'Comments': created_review.Comments,
        'pet_store_id': created_review.pet_store_id,
        'user': {
            'id': created_review.user.id,
            'username': created_review.user.username,
            'email': created_review.user.email,
            'phone_number': created_review.user.phone_number,
        } if created_review.user else None
    }

    return jsonify({'message': 'Review created successfully',
                    'review': response_data
                    })


# Update a review for a pet store
@review_bp.route('/reviews/<int:review_id>', methods=['PUT'])
@jwt_required()
def update_review(review_id):
    data = request.get_json()

    # Ensure required fields are present in the request
    if 'Rating' not in data or 'Comments' not in data:
        return make_response(jsonify({'error': 'Missing required fields in the request'}), 400)

    Rating = data.get('Rating')
    Comments = data.get('Comments')

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

            return (jsonify({'success': 'Review deleted successfully'}), 200)
        else:
            return jsonify({"error": "You are trying to delete someone's review!"}), 404
        