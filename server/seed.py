from app import app, db, User, Pet, PetStore, Review
from faker import Faker
import random

fake = Faker()

# Array of genders for pets
genderArray = ["Male", "Female"]

petImages = [
    "https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?size=626&ext=jpg&ga=GA1.2.1629008978.1706000355&semt=sph",
    "htps://img.freepik.com/premium-psd/tabby-cat_76964-27012.jpg?size=626&ext=jpg&ga=GA1.2.1629008978.1706000355&semt=spht",
    "https://img.freepik.com/free-photo/closeup-shot-beautiful-ginger-domestic-kitten-sitting-white-surface_181624-35913.jpg?size=626&ext=jpg&ga=GA1.2.1629008978.1706000355&semt=sph",
    "https://img.freepik.com/free-photo/portrait-beautiful-purebred-pussycat-with-shorthair-orange-collar-neck-sitting-floor-reacting-camera-flash-scared-looking-light-indoor_8353-12551.jpg?size=626&ext=jpg&ga=GA1.2.1629008978.1706000355&semt=sph",
    "https://img.freepik.com/free-photo/lovely-pet-portrait-isolated_23-2149192357.jpg?size=626&ext=jpg",
    "https://img.freepik.com/free-photo/shallow-focus-vertical-shot-cute-golden-retriever-puppy-sitting-grass-ground_181624-27259.jpg?size=626&ext=jpg&ga=GA1.2.1629008978.1706000355&semt=sph",
    "https://img.freepik.com/free-photo/portrait-siberian-husky-with-different-colored-eyes-black-background_181624-40661.jpg?size=626&ext=jpg&ga=GA1.1.1629008978.1706000355&semt=sph",
    "https://img.freepik.com/free-photo/e6mmqmducags9ema81vqg4lssvin112lzmqib9g8jpg_181624-57371.jpg?size=626&ext=jpg&ga=GA1.1.1629008978.1706000355&semt=sph",
    "https://img.freepik.com/free-photo/selective-shot-aquarium-yellow-cichlidae-fish_181624-35618.jpg?size=626&ext=jpg&ga=GA1.2.1629008978.1706000355&semt=ais",
    "https://img.freepik.com/free-photo/halfmoon-betta-fish_1150-7816.jpg?size=626&ext=jpg&ga=GA1.2.1629008978.1706000355&semt=ais",
    "https://img.freepik.com/free-photo/copperband-butterflyfish-chelmon-rostratus-marine-fish-beautiful-fish-seabed-coral-reefs_488145-1954.jpg?size=626&ext=jpg&ga=GA1.2.1629008978.1706000355&semt=ais",
    "https://img.freepik.com/free-photo/closeup-shot-cute-colorful-parrot-green-background_181624-16152.jpg?size=626&ext=jpg&ga=GA1.2.1629008978.1706000355&semt=ais",
    "https://img.freepik.com/free-photo/shot-beautiful-eurasian-golden-oriole-standing-wood_181624-36344.jpg?size=626&ext=jpg&ga=GA1.2.1629008978.1706000355&semt=ais",
    "https://img.freepik.com/free-photo/liopeltis-snake-closeup-green-leaves-leopeltis-snake-front-view_488145-94.jpg?size=626&ext=jpg&ga=GA1.2.1629008978.1706000355&semt=ais",
    "https://img.freepik.com/free-photo/boiga-snake-dendrophila-yellow-ringed-head-boiga-dendrophila-animal-closeup-animal-attack_488145-2042.jpg?size=626&ext=jpg&ga=GA1.2.1629008978.1706000355&semt=ais",
    "https://img.freepik.com/free-photo/cute-guinea-pig-green-grass-garden_127675-2390.jpg?w=1800&t=st=1706002230~exp=1706002830~hmac=db6df081dcd40ecfc3704cb33d5a1c8d28417883fa7c445412ed032a559a4aed",
    "https://img.freepik.com/free-photo/guinea-pig-wooden-table_181624-29207.jpg?size=626&ext=jpg&ga=GA1.2.1629008978.1706000355&semt=ais",
    "https://img.freepik.com/free-photo/cute-guinea-pig-green-grass-garden_127675-2387.jpg?size=626&ext=jpg&ga=GA1.2.1629008978.1706000355&semt=ais",
    "https://img.freepik.com/free-photo/closeup-yellow-albino-iguana-closeup-albinoi-iguana-closeup-animal-closeup_488145-3570.jpg?size=626&ext=jpg&ga=GA1.2.1629008978.1706000355&semt=ais",
    "https://img.freepik.com/free-photo/big-green-iguana-lying-piece-wood_181624-4785.jpg?size=626&ext=jpg&ga=GA1.1.1629008978.1706000355&semt=ais",
    "https://img.freepik.com/free-photo/domestic-pet-rabbit-green-grass_181624-48945.jpg?size=626&ext=jpg&ga=GA1.2.1629008978.1706000355&semt=ais",
    "https://img.freepik.com/free-photo/portrait-cute-fluffy-gray-rabbit-with-ears-natural-green-grass_78492-3948.jpg?size=626&ext=jpg&ga=GA1.2.1629008978.1706000355&semt=ais"
    
]

# Array of comments related to reviewing a pet store
review_comments = [
    "Great selection of pets!",
    "Friendly staff and clean environment.",
    "The prices are reasonable.",
    "I love the variety of species they have.",
    "The store is well-maintained and organized.",
    "Excellent customer service.",
    "The pet store is my go-to place for all pet supplies.",
    "I highly recommend this pet store.",
    "They have unique and rare species.",
    "Knowledgeable staff members.",
    "The pet store has a welcoming atmosphere.",
    "My pets always enjoy their purchases from here.",
    "The staff goes above and beyond to assist customers.",
    "The pet store supports local animal shelters.",
    "Fair and transparent pricing.",
    "A great place for pet enthusiasts!",
    "Clean and spacious store layout.",
    "I found everything I needed for my furry friends.",
    "The pet store hosts informative events for pet owners.",
    "The pet store contributes to community events.",
]

def seed_data():
    with app.app_context():
        
        print('<<<<<<=Deleting existing seed data=>>>>>>')
        User.query.delete()
        Pet.query.delete()
        PetStore.query.delete()
        Review.query.delete()
        
        db.create_all()
        
        print('<<<<<<=Seeding new data to the tables=>>>>>>')
        
        # Users data
        users = []
        for _ in range(10):
            user = User(username=fake.name(),
                        email=fake.email(),
                        phone_number=fake.random_int(min=1000000000, max=9999999999),
                        password=fake.password(),
                        profile_image_url=fake.image_url(),
                        )
            users.append(user)
            db.session.add(user)
        db.session.commit()
        
        # Pet Stores data
        pet_stores = []
        for _ in range(5):
            pet_store = PetStore(name=fake.company(),
                                 location=fake.address(),
                                 phone_number=fake.random_int(min=1000000000, max=9999999999),
                                 email=fake.company_email(),
                                 )
            pet_stores.append(pet_store)
            db.session.add(pet_store)
        db.session.commit()
        
        # Pets data
        pets = []
        for _ in range(20):
            user = random.choice(users)
            pet_store = random.choice(pet_stores)
            
            pet = Pet(name=fake.first_name(),
                      gender=random.choice(genderArray),
                      price=random.randint(10, 100),
                      age=random.randint(1, 10),
                      user=user,
                      pet_store=pet_store,
                      image_url=random.choice(petImages),
                      )
            pets.append(pet)
            db.session.add(pet)
        db.session.commit()
        
        # Reviews data
        reviews = []
        for _ in range(15):
            user = random.choice(users)
            pet_store = random.choice(pet_stores)
            
            review = Review(Rating=fake.random_int(min=1, max=5),
                            Comments=random.choice(review_comments),
                            user=user,
                            pet_store=pet_store,
                            )
            reviews.append(review)
            db.session.add(review)
        db.session.commit()
        
        print('<<<<<<= Completed seeding! =>>>>>>')

if __name__ == '__main__':
    seed_data()