# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
if Rails.env.development?
  super_admin = User.create(name: "Super Admin", email: "super@aa.com", password: "123123123")
  super_admin.add_role :super_admin

  admin = User.create(name: "Admin", email: "admin@aa.com", password: "123123123")
  admin.add_role :admin

  user = User.create(name: "user", email: "user@aa.com", password: "123123123")
  user.add_role :user

  puts "Total users: #{User.count}"
end