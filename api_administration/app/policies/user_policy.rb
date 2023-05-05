class UserPolicy < ApplicationPolicy

  def index?
    super_admin_or_admin?
  end

  def show?
    super_admin_or_admin? || user == record
  end

  def create?
    super_admin_or_admin?
  end

  def update?
    super_admin_or_admin?
  end
  
  def destroy?
    super_admin_or_admin?
  end

end