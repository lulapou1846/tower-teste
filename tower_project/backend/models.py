from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(120), unique=True, nullable=False)
    cnpj = db.Column(db.String(18), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    plan_id = db.Column(db.Integer, db.ForeignKey('plan.id'), nullable=True)
    plan = db.relationship('Plan', backref='users')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<User {self.email}>'

class Plan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    price_monthly = db.Column(db.Float, nullable=False)
    price_annually = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f'<Plan {self.name}>'

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='categories')

    def __repr__(self):
        return f'<Category {self.name}>'

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.Integer, unique=True, nullable=False)
    description = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(50), nullable=False) # 'Produto' or 'Insumo'
    unit_of_measurement = db.Column(db.String(50), nullable=False)
    quantity_packaging = db.Column(db.Float, nullable=True) # Only for 'Insumo'
    cost_packaging = db.Column(db.Float, nullable=True) # Only for 'Insumo'
    unit_cost = db.Column(db.Float, nullable=True) # Calculated for 'Insumo'
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    category = db.relationship('Category', backref='products')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='products')

    def __repr__(self):
        return f'<Product {self.description}>'

class TechnicalSheet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    product = db.relationship('Product', backref='technical_sheets')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='technical_sheets')
    # Add fields for production cost, taxes, personnel, operational costs, expenses, profit margin, etc.
    # These fields will likely be complex and might involve relationships to other tables or be stored as JSON/dict
    # For simplicity, let's add a generic data field for now.
    data = db.Column(db.JSON, nullable=True)

    def __repr__(self):
        return f'<TechnicalSheet for {self.product.description}>'

class SalesSummary(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='sales_summaries')
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    category = db.relationship('Category', backref='sales_summaries')
    # Add fields for sales data, CMVs, prices, margins, etc.
    data = db.Column(db.JSON, nullable=True)

    def __repr__(self):
        return f'<SalesSummary for {self.user.company_name} - {self.category.name}>'

