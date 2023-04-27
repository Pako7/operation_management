module JsonErrors
    extend ActiveSupport::Concern
  
    included do
      rescue_from StandardError, with: :render_500
      rescue_from ActiveRecord::RecordNotFound, with: :render_404
      rescue_from ActionController::ParameterMissing, with: :render_400
  
      def render_500(error)
        render_errors(error, 'internal server error', 500)
      end

      def render_404(error)
        render_errors(error, 'not found', 404)
      end

      def render_400(error)
        render_errors(error, 'required parameters invalid', 400)
      end

      def render_errors(error, message, status)
        Airbrake.notify(error)
        render json: { error: message } , status: status
      end
    end
  end