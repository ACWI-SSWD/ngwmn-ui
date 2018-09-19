from flask import jsonify

from ngwmn import app


class ServiceException(Exception):
    """
    Exception to be raised by external-service calls when a service error is
    encountered. This exception will be passed to the end-user in the form of
    a response with the given status code, message, and dict payload.
    """
    def __init__(self, message=None, status_code=503, payload=None):
        super(ServiceException, self).__init__()
        self.message = message or 'error in backing service'
        self.status_code = status_code
        self.payload = payload or {}

    def to_dict(self):
        """
        Convert this exception into a dictionary.
        """
        return {
            **self.payload,
            'message': self.message,
            'status_code': self.status_code
        }


@app.errorhandler(ServiceException)
def handle_service_exception(error):
    """
    Capture raised ServiceExceptions and return the appropriate status code.
    """
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
