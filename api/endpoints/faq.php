<?php
// FAQ API Endpoint
global $db;

switch ($method) {
    case 'GET':
        try {
            $category = $_GET['category'] ?? '';
            
            // Static FAQ data (in a real app, this would come from database)
            $faqs = [
                'booking' => [
                    [
                        'id' => 1,
                        'question' => 'How can I make a reservation?',
                        'answer' => 'You can make a reservation through our website, by calling our reservation hotline at +1 (555) 123-4567, or by visiting any of our hotel locations directly. Online booking is available 24/7 and offers the best rates.',
                        'category' => 'booking'
                    ],
                    [
                        'id' => 2,
                        'question' => 'Can I cancel or modify my reservation?',
                        'answer' => 'Yes, most reservations can be cancelled or modified up to 24 hours before your check-in date without penalty. However, cancellation policies may vary depending on the rate plan and hotel. Please check your confirmation email for specific terms.',
                        'category' => 'booking'
                    ],
                    [
                        'id' => 3,
                        'question' => 'Do you offer group booking discounts?',
                        'answer' => 'Yes, we offer special rates for group bookings of 10 or more rooms. Please contact our group sales team at groups@elitehotels.com or call +1 (555) 123-4568 for personalized assistance and pricing.',
                        'category' => 'booking'
                    ],
                    [
                        'id' => 4,
                        'question' => 'What payment methods do you accept?',
                        'answer' => 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and bank transfers. A valid credit card is required at check-in for incidental charges, even if your stay is prepaid.',
                        'category' => 'booking'
                    ]
                ],
                'rooms' => [
                    [
                        'id' => 5,
                        'question' => 'What time is check-in and check-out?',
                        'answer' => 'Standard check-in time is 3:00 PM and check-out is 11:00 AM. Early check-in and late check-out may be available upon request and subject to availability. Additional charges may apply for late check-out.',
                        'category' => 'rooms'
                    ],
                    [
                        'id' => 6,
                        'question' => 'Do all rooms have Wi-Fi?',
                        'answer' => 'Yes, complimentary high-speed Wi-Fi is available in all guest rooms and public areas throughout our hotels. Premium internet packages with enhanced speeds are also available for purchase.',
                        'category' => 'rooms'
                    ],
                    [
                        'id' => 7,
                        'question' => 'Are your hotels accessible for guests with disabilities?',
                        'answer' => 'Yes, all of our hotels are fully accessible and comply with ADA requirements. We offer accessible rooms with roll-in showers, grab bars, and other accessibility features. Please inform us of your specific needs when booking.',
                        'category' => 'rooms'
                    ],
                    [
                        'id' => 8,
                        'question' => 'Do you provide cribs or rollaway beds?',
                        'answer' => 'Yes, cribs are available free of charge for children under 2 years old. Rollaway beds are available for $25 per night, subject to room size and availability. Please request these items when making your reservation.',
                        'category' => 'rooms'
                    ]
                ],
                'policies' => [
                    [
                        'id' => 9,
                        'question' => 'What is your pet policy?',
                        'answer' => 'We welcome well-behaved pets at most of our locations. A pet fee of $75 per stay applies, and pets must be kept on a leash in public areas. Service animals are always welcome at no charge. Please check with the specific hotel for their pet policy.',
                        'category' => 'policies'
                    ],
                    [
                        'id' => 10,
                        'question' => 'Is smoking allowed in the hotels?',
                        'answer' => 'All of our hotels are smoke-free environments. Smoking is prohibited in all guest rooms and indoor public areas. Designated outdoor smoking areas are available. Violation of this policy results in a $250 cleaning fee.',
                        'category' => 'policies'
                    ],
                    [
                        'id' => 11,
                        'question' => 'What is your age requirement for check-in?',
                        'answer' => 'Guests must be at least 18 years old to check in. A valid government-issued photo ID and credit card in the guest\'s name are required at check-in. Guests under 18 must be accompanied by a parent or guardian.',
                        'category' => 'policies'
                    ]
                ],
                'services' => [
                    [
                        'id' => 12,
                        'question' => 'Do you offer airport shuttle service?',
                        'answer' => 'Airport shuttle availability varies by location. Many of our hotels offer complimentary shuttle service within a certain radius, while others provide shuttle service for a fee. Please check with your specific hotel or contact our concierge team.',
                        'category' => 'services'
                    ],
                    [
                        'id' => 13,
                        'question' => 'Is there a fitness center and pool?',
                        'answer' => 'Most of our hotels feature state-of-the-art fitness centers and swimming pools. Fitness centers are typically open 24/7 for hotel guests. Pool hours vary by location but are generally open from 6:00 AM to 10:00 PM.',
                        'category' => 'services'
                    ],
                    [
                        'id' => 14,
                        'question' => 'Do you provide room service?',
                        'answer' => 'Yes, 24-hour room service is available at most of our locations. Our extensive menu features both local specialties and international cuisine. Room service hours may vary by location and are detailed in your guest room directory.',
                        'category' => 'services'
                    ],
                    [
                        'id' => 15,
                        'question' => 'Is parking available?',
                        'answer' => 'Yes, parking is available at all our hotels. Some locations offer complimentary self-parking, while others may charge a daily fee. Valet parking is available at select properties. Please check with your specific hotel for parking rates and availability.',
                        'category' => 'services'
                    ]
                ]
            ];
            
            if (!empty($category) && isset($faqs[$category])) {
                Response::success($faqs[$category], "FAQ for {$category} retrieved successfully");
            } else {
                // Return all FAQs
                $allFaqs = [];
                foreach ($faqs as $categoryFaqs) {
                    $allFaqs = array_merge($allFaqs, $categoryFaqs);
                }
                Response::success($allFaqs, 'All FAQs retrieved successfully');
            }
            
        } catch (Exception $e) {
            error_log('FAQ API Error: ' . $e->getMessage());
            Response::error('Failed to retrieve FAQs');
        }
        break;
        
    default:
        Response::error('Method not allowed', 405);
}
?>