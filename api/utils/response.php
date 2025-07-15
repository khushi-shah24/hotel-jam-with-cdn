<?php
// API Response Utility Class
class Response {
    public static function success($data = null, $message = 'Success', $code = 200) {
        http_response_code($code);
        echo json_encode([
            'success' => true,
            'message' => $message,
            'data' => $data,
            'timestamp' => date('c')
        ]);
        exit();
    }
    
    public static function error($message = 'Error', $code = 400, $details = null) {
        http_response_code($code);
        echo json_encode([
            'success' => false,
            'message' => $message,
            'details' => $details,
            'timestamp' => date('c')
        ]);
        exit();
    }
    
    public static function paginated($data, $total, $page = 1, $limit = 10, $message = 'Success') {
        $totalPages = ceil($total / $limit);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => $message,
            'data' => $data,
            'pagination' => [
                'current_page' => (int)$page,
                'total_pages' => $totalPages,
                'total_items' => (int)$total,
                'items_per_page' => (int)$limit,
                'has_next' => $page < $totalPages,
                'has_prev' => $page > 1
            ],
            'timestamp' => date('c')
        ]);
        exit();
    }
    
    public static function created($data = null, $message = 'Created successfully') {
        self::success($data, $message, 201);
    }
    
    public static function updated($data = null, $message = 'Updated successfully') {
        self::success($data, $message, 200);
    }
    
    public static function deleted($message = 'Deleted successfully') {
        self::success(null, $message, 200);
    }
    
    public static function notFound($message = 'Resource not found') {
        self::error($message, 404);
    }
    
    public static function unauthorized($message = 'Unauthorized') {
        self::error($message, 401);
    }
    
    public static function forbidden($message = 'Forbidden') {
        self::error($message, 403);
    }
    
    public static function validation($errors, $message = 'Validation failed') {
        self::error($message, 422, $errors);
    }
}
?>