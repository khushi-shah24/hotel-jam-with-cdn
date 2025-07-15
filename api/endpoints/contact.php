<?php
// Contact API Endpoint
global $db;

switch ($method) {
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            Response::error('Invalid JSON data');
        }
        
        $validator = Validator::make($input, [
            'name' => 'required|min:2|max:100',
            'email' => 'required|email|max:255',
            'subject' => 'required|in:general,reservation,complaint,compliment,group,event,other',
            'message' => 'required|min:10|max:2000'
        ]);
        
        // Optional fields validation
        if (isset($input['phone']) && !empty($input['phone'])) {
            $validator->phone('phone');
        }
        
        if ($validator->fails()) {
            Response::validation($validator->errors());
        }
        
        $data = Validator::sanitize($validator->validated());
        
        try {
            // In a real application, you would:
            // 1. Save to database
            // 2. Send email notification
            // 3. Add to CRM system
            
            // For now, we'll just log the contact submission
            error_log('Contact form submission: ' . json_encode($data));
            
            // Simulate processing time
            usleep(500000); // 0.5 seconds
            
            // Create response
            $response = [
                'id' => uniqid('contact_'),
                'submitted_at' => date('c'),
                'status' => 'received',
                'estimated_response_time' => '24 hours'
            ];
            
            Response::success($response, 'Thank you for your message! We will get back to you within 24 hours.');
            
        } catch (Exception $e) {
            error_log('Contact form error: ' . $e->getMessage());
            Response::error('Failed to submit contact form. Please try again.');
        }
        break;
        
    default:
        Response::error('Method not allowed', 405);
}
?>