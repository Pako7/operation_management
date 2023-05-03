module Api::V1
  class UserSerializer < ActiveModel::Serializer
    attributes :id, :name, :email, :cv_link, :tech_knowledge, 
    :english_level, :team_id, :start_team_at, :end_team_at, :roles

    def roles
      object.roles_name
    end
  end
end
