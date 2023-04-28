module JsonErrors
    extend ActiveSupport::Concern
  
    included do
      rescue_from StandardError, with: :render_500
      rescue_from Pundit::NotAuthorizedError, with: :render_401
      rescue_from ActiveRecord::RecordNotFound, with: :render_404
      rescue_from ActionController::ParameterMissing, with: :render_400
      rescue_from ActiveRecord::RecordInvalid,
              with: :render_unprocessable_entity_response

      def render_500(error)
        render_errors(error, 'internal server error', 500)
      end

      def render_401(error)
        render_errors(error, 'You are not authorized to perform this action', 401)
      end

      def render_404(error)
        render_errors(error, error.message, 404)
      end

      def render_400(error)
        render_errors(error, 'required parameters invalid', 400)
      end

      def render_unprocessable_entity_response(error)
        render_errors(error, error.record.errors, :unprocessable_entity)
      end

      def render_errors(error, message, status)
        Airbrake.notify(error)
        render json: { error: message } , status: status
      end
    end
  end