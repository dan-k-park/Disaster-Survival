# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_14_083649) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "disasters", force: :cascade do |t|
    t.string "name"
    t.integer "damage"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "protection"
  end

  create_table "games", force: :cascade do |t|
    t.string "game_name"
    t.integer "score"
    t.integer "health"
    t.integer "turn"
    t.boolean "status"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_games_on_user_id"
  end

  create_table "hints", force: :cascade do |t|
    t.string "content"
    t.bigint "disaster_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["disaster_id"], name: "index_hints_on_disaster_id"
  end

  create_table "protections", force: :cascade do |t|
    t.string "name"
    t.integer "price"
    t.integer "buff"
    t.bigint "game_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["game_id"], name: "index_protections_on_game_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "games", "users"
  add_foreign_key "hints", "disasters"
  add_foreign_key "protections", "games"
end
