# Pet Breed Classifier API

REST API for user auth, pet image upload, and breed prediction using a TensorFlow model served from Node.js.

## Model focus (Python + TensorFlow + Pandas)

The prediction model in this project is deployed as a TensorFlow.js GraphModel in `model/model.json` with 22 weight shards.

- **Training origin:** created in **Python**, using **TensorFlow** (with a transfer-learning architecture consistent with InceptionV3) and a **Pandas-based** dataset workflow.
- **Deployment format:** converted for Node inference with TensorFlow.js (`@tensorflow/tfjs-node`).
- **Input signature:** `[-1, 299, 299, 3]`
- **Output signature:** `[-1, 37]` (37 pet classes)

At runtime (`controllers/model.js`), uploaded images are decoded, resized to **299x299**, batched, and passed to the graph model for class prediction.

## Tech stack

- Python + TensorFlow + Pandas (model training/data pipeline)
- Node.js + Express
- TensorFlow.js Node runtime (`@tensorflow/tfjs-node`)
- PostgreSQL + Sequelize
- JWT auth + bcrypt
- Multer for image uploads

## Project structure

```text
.
├── controllers/
├── routes/
├── models/
├── constants/breeds.js      # 37 label definitions + descriptions
├── model/                   # TensorFlow.js GraphModel + shard files
├── database/index.js        # Sequelize PostgreSQL connection
└── index.js                 # App entrypoint
```

## API endpoints

- `POST /user/signup` - register user
- `POST /user/login` - login and receive JWT
- `POST /model/upload` - upload pet image and get prediction (**Bearer token required**, form field: `image`)
- `GET /pet/list` - list authenticated user's predicted pets (**Bearer token required**)
- `GET /pet/getimage/:image` - return stored image file

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Ensure PostgreSQL is running and create/update credentials in `database/index.js`.
   - Current defaults in code:
     - database: `breedclassifier`
     - user: `breedclassifier`
     - password: `breedclassifier`
     - host: `localhost`

3. Create uploads directory:

   ```bash
   mkdir -p uploads/pets
   ```

4. Start API in dev mode:

   ```bash
   npm run dev
   ```

Server runs on `http://localhost:3000`.

## Quick prediction example

```bash
curl -X POST http://localhost:3000/model/upload \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -F "image=@/absolute/path/to/pet.jpg"
```

The response includes the predicted breed, class index, and raw prediction scores.
