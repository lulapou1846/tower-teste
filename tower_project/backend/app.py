from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from models import db, User, Plan, Category, Product, TechnicalSheet, SalesSummary
import os
import stripe

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tower.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# Configure Stripe (replace with your actual secret key)
import os
stripe.api_key = os.getenv("STRIPE_API_KEY")


@app.before_request
def create_tables():
    db.create_all()

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    company_name = data.get("company_name")
    cnpj = data.get("cnpj")
    email = data.get("email")
    password = data.get("password")

    if not all([company_name, cnpj, email, password]):
        return jsonify({"message": "Missing data"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 409

    new_user = User(company_name=company_name, cnpj=cnpj, email=email, password=password) # In a real app, hash the password!
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully", "user_id": new_user.id}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email, password=password).first() # In a real app, check hashed password!

    if user:
        return jsonify({"message": "Login successful", "user_id": user.id}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route("/plans", methods=["GET"])
def get_plans():
    plans = Plan.query.all()
    return jsonify([{"id": p.id, "name": p.name, "price_monthly": p.price_monthly, "price_annually": p.price_annually, "description": p.description} for p in plans]), 200

@app.route("/create-checkout-session", methods=["POST"])
def create_checkout_session():
    data = request.get_json()
    plan_id = data.get("plan_id")
    billing_type = data.get("billing_type") # monthly or annually

    plan = Plan.query.get(plan_id)
    if not plan:
        return jsonify({"error": "Plan not found"}), 404

    price = plan.price_monthly if billing_type == "monthly" else plan.price_annually
    plan_name = f"{plan.name} ({billing_type.capitalize()})"

    try:
        # Simulate a successful checkout session for sandbox environment
        return jsonify({"checkout_url": "http://localhost:5174/dashboard?success=true"})
    except Exception as e:
        return jsonify({"error": str(e)}), 403

@app.route("/products", methods=["POST"])
def add_product():
    data = request.get_json()
    user_id = data.get("user_id") # Assuming user_id is sent with the request
    code = data.get("code")
    description = data.get("description")
    item_type = data.get("type")
    unit_of_measurement = data.get("unit_of_measurement")
    category_id = data.get("category_id")

    if not all([user_id, code, description, item_type, unit_of_measurement, category_id]):
        return jsonify({"message": "Missing data"}), 400

    if item_type == "Insumo":
        quantity_packaging = data.get("quantity_packaging")
        cost_packaging = data.get("cost_packaging")
        if not all([quantity_packaging, cost_packaging]):
            return jsonify({"message": "Missing data for Insumo"}), 400
        unit_cost = cost_packaging / quantity_packaging if quantity_packaging else 0
        new_product = Product(user_id=user_id, code=code, description=description, type=item_type, unit_of_measurement=unit_of_measurement, category_id=category_id, quantity_packaging=quantity_packaging, cost_packaging=cost_packaging, unit_cost=unit_cost)
    else:
        new_product = Product(user_id=user_id, code=code, description=description, type=item_type, unit_of_measurement=unit_of_measurement, category_id=category_id)

    db.session.add(new_product)
    db.session.commit()

    return jsonify({"message": "Product added successfully", "product_id": new_product.id}), 201

@app.route("/products/<int:user_id>", methods=["GET"])
def get_products(user_id):
    products = Product.query.filter_by(user_id=user_id).all()
    product_list = []
    for p in products:
        product_data = {
            "id": p.id,
            "code": p.code,
            "description": p.description,
            "type": p.type,
            "unit_of_measurement": p.unit_of_measurement,
            "category_id": p.category_id,
            "quantity_packaging": p.quantity_packaging,
            "cost_packaging": p.cost_packaging,
            "unit_cost": p.unit_cost
        }
        product_list.append(product_data)
    return jsonify(product_list), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        # Add some initial plans if they don't exist
        if not Plan.query.first():
            plan1 = Plan(name="Plano Essencial", price_monthly=149.00, price_annually=1609.20, description="Plano básico")
            plan2 = Plan(name="PRO", price_monthly=599.00, price_annually=6469.20, description="Plano profissional")
            plan3 = Plan(name="Enterprise", price_monthly=0.00, price_annually=0.00, description="Plano empresarial, contate-nos")
            db.session.add_all([plan1, plan2, plan3])
            db.session.commit()

    app.run(debug=True, port=5000)

from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__, static_folder="../frontend/dist", static_url_path="/")

@app.route("/")
def serve_react():
    return send_from_directory(app.static_folder, "index.html")

@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, "index.html")


