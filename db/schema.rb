# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161007160058) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "annotations", force: :cascade do |t|
    t.integer  "user_id",  null: false
    t.string   "title"
    t.text     "body"
    t.boolean  "session"
    t.boolean  "cart_add"
    t.boolean  "checkout"
    t.boolean  "purchase"
    t.datetime "date",     null: false
  end

  add_index "annotations", ["date"], name: "index_annotations_on_date", using: :btree
  add_index "annotations", ["user_id"], name: "index_annotations_on_user_id", using: :btree

  create_table "customers", force: :cascade do |t|
    t.datetime "signup",          null: false
    t.string   "signup_platform", null: false
    t.string   "signup_channel",  null: false
    t.string   "ab_group"
    t.integer  "age",             null: false
    t.boolean  "gender",          null: false
  end

  add_index "customers", ["ab_group"], name: "index_customers_on_ab_group", using: :btree
  add_index "customers", ["age"], name: "index_customers_on_age", using: :btree
  add_index "customers", ["gender"], name: "index_customers_on_gender", using: :btree
  add_index "customers", ["signup"], name: "index_customers_on_signup", using: :btree
  add_index "customers", ["signup_channel"], name: "index_customers_on_signup_channel", using: :btree
  add_index "customers", ["signup_platform"], name: "index_customers_on_signup_platform", using: :btree

  create_table "events", force: :cascade do |t|
    t.integer  "customer_id",      null: false
    t.boolean  "new_user_session", null: false
    t.string   "session_platform", null: false
    t.datetime "session",          null: false
    t.datetime "cart_add"
    t.datetime "checkout"
    t.datetime "purchase"
  end

  add_index "events", ["cart_add"], name: "index_events_on_cart_add", using: :btree
  add_index "events", ["checkout"], name: "index_events_on_checkout", using: :btree
  add_index "events", ["customer_id"], name: "index_events_on_customer_id", using: :btree
  add_index "events", ["new_user_session"], name: "index_events_on_new_user_session", using: :btree
  add_index "events", ["purchase"], name: "index_events_on_purchase", using: :btree
  add_index "events", ["session"], name: "index_events_on_session", using: :btree
  add_index "events", ["session_platform"], name: "index_events_on_session_platform", using: :btree

  create_table "queries", force: :cascade do |t|
    t.integer "user_id"
    t.string  "title"
    t.string  "query"
    t.boolean "dashboard"
  end

  add_index "queries", ["user_id"], name: "index_queries_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "first_name"
    t.string   "last_name"
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
