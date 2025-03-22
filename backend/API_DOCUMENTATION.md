# Flypchat API Documentation

## Base URL
`http://localhost:8080`

## Expert Routes

### 1. Get All Experts
- **Method:** GET
- **URL:** `/experts`
- **Description:** Retrieve a list of all experts
- **Response Body:**
```json
[
  {
    "_id": "expert_id",
    "name": "John Doe",
    "title": "Career Coach",
    "specialization": "Career Development",
    "bio": "15+ years of experience in career counseling",
    "avatarUrl": "https://example.com/avatar.jpg",
    "price": 100,
    "rating": 4.5,
    "reviewCount": 25,
    "expertise": ["Career Planning", "Resume Writing"],
    "workingHours": {
      "start": "09:00",
      "end": "17:00"
    },
    "workingDays": [1, 2, 3, 4, 5]
  }
]
```

### 2. Get Expert by ID
- **Method:** GET
- **URL:** `/experts/:id`
- **Description:** Retrieve a specific expert by their ID
- **Response Body:**
```json
{
  "_id": "expert_id",
  "name": "John Doe",
  "title": "Career Coach",
  "specialization": "Career Development",
  "bio": "15+ years of experience in career counseling",
  "avatarUrl": "https://example.com/avatar.jpg",
  "price": 100,
  "rating": 4.5,
  "reviewCount": 25,
  "expertise": ["Career Planning", "Resume Writing"],
  "workingHours": {
    "start": "09:00",
    "end": "17:00"
  },
  "workingDays": [1, 2, 3, 4, 5],
  "availability": [
    {
      "date": "2024-02-20",
      "startTime": "09:00",
      "endTime": "10:00",
      "isBooked": false,
      "duration": 60
    }
  ]
}
```

### 3. Create Expert
- **Method:** POST
- **URL:** `/experts`
- **Description:** Create a new expert
- **Request Body:**
```json
{
  "name": "John Doe",
  "title": "Career Coach",
  "specialization": "Career Development",
  "bio": "15+ years of experience in career counseling",
  "avatarUrl": "https://example.com/avatar.jpg",
  "price": 100,
  "expertise": ["Career Planning", "Resume Writing"],
  "workingHours": {
    "start": "09:00",
    "end": "17:00"
  },
  "workingDays": [1, 2, 3, 4, 5]
}
```

### 4. Update Expert
- **Method:** PUT
- **URL:** `/experts/:id`
- **Description:** Update an existing expert's information
- **Request Body:** Same as Create Expert

### 5. Delete Expert
- **Method:** DELETE
- **URL:** `/experts/:id`
- **Description:** Delete an expert

### 6. Get Expert Availability
- **Method:** GET
- **URL:** `/experts/:id/availability?date=2024-02-20`
- **Description:** Get available time slots for a specific expert on a given date
- **Response Body:**
```json
[
  {
    "_id": "slot_id",
    "expertId": "expert_id",
    "date": "2024-02-20",
    "startTime": "09:00",
    "endTime": "10:00",
    "isBooked": false,
    "isBlocked": false,
    "duration": 60
  }
]
```

### 7. Add Availability Slots
- **Method:** POST
- **URL:** `/experts/:id/availability`
- **Description:** Add availability slots for an expert
- **Request Body:**
```json
{
  "date": "2024-02-20",
  "slots": [
    {
      "startTime": "09:00",
      "endTime": "10:00"
    },
    {
      "startTime": "10:00",
      "endTime": "11:00"
    }
  ]
}
```
- **Response Body:**
```json
[
  {
    "_id": "slot_id_1",
    "expertId": "expert_id",
    "date": "2024-02-20",
    "startTime": "09:00",
    "endTime": "10:00",
    "isBooked": false,
    "isBlocked": false,
    "duration": 60
  },
  {
    "_id": "slot_id_2",
    "expertId": "expert_id",
    "date": "2024-02-20",
    "startTime": "10:00",
    "endTime": "11:00",
    "isBooked": false,
    "isBlocked": false,
    "duration": 60
  }
]
```

## Customer Routes

### 1. Create Customer
- **Method:** POST
- **URL:** `/customers`
- **Description:** Create a new customer
- **Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "additionalInfo": "Preferred language: English"
}
```
- **Response Body:**
```json
{
  "_id": "customer_id",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "additionalInfo": "Preferred language: English",
  "createdAt": "2024-02-20T09:00:00.000Z",
  "updatedAt": "2024-02-20T09:00:00.000Z"
}
```

### 2. Get Customer by ID
- **Method:** GET
- **URL:** `/customers/:id`
- **Description:** Retrieve a specific customer's information
- **Response Body:**
```json
{
  "_id": "customer_id",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "additionalInfo": "Preferred language: English",
  "createdAt": "2024-02-20T09:00:00.000Z",
  "updatedAt": "2024-02-20T09:00:00.000Z",
  "bookings": [
    {
      "_id": "booking_id",
      "expertId": "expert_id",
      "date": "2024-02-20",
      "startTime": "09:00",
      "endTime": "10:00",
      "status": "confirmed"
    }
  ]
}
```

### 3. Create Booking
- **Method:** POST
- **URL:** `/customers/:customerId/bookings`
- **Description:** Create a new booking for a customer
- **Request Body:**
```json
{
  "expertId": "expert_id",
  "date": "2024-02-20",
  "startTime": "09:00",
  "endTime": "10:00",
  "duration": 60,
  "sessionFee": 100
}
```
- **Response Body:**
```json
{
  "_id": "booking_id",
  "customerId": "customer_id",
  "expertId": "expert_id",
  "date": "2024-02-20",
  "startTime": "09:00",
  "endTime": "10:00",
  "duration": 60,
  "sessionFee": 100,
  "status": "pending",
  "paymentStatus": "pending",
  "bookedSlots": ["slot_id"],
  "createdAt": "2024-02-20T09:00:00.000Z",
  "updatedAt": "2024-02-20T09:00:00.000Z"
}
```

### 4. Get Customer Bookings
- **Method:** GET
- **URL:** `/customers/:customerId/bookings`
- **Description:** Retrieve all bookings for a specific customer
- **Response Body:**
```json
[
  {
    "_id": "booking_id",
    "customerId": "customer_id",
    "expertId": {
      "_id": "expert_id",
      "name": "John Doe",
      "title": "Career Coach",
      "avatarUrl": "https://example.com/avatar.jpg"
    },
    "date": "2024-02-20",
    "startTime": "09:00",
    "endTime": "10:00",
    "duration": 60,
    "sessionFee": 100,
    "status": "confirmed",
    "paymentStatus": "completed",
    "createdAt": "2024-02-20T09:00:00.000Z",
    "updatedAt": "2024-02-20T09:00:00.000Z"
  }
]
```

### 5. Update Booking Status
- **Method:** PUT
- **URL:** `/customers/bookings/:id/status`
- **Description:** Update the status of a booking
- **Request Body:**
```json
{
  "status": "confirmed"
}
```
- **Response Body:**
```json
{
  "_id": "booking_id",
  "status": "confirmed",
  "updatedAt": "2024-02-20T09:00:00.000Z"
}
```

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Error Response Format
```json
{
  "message": "Error message here"
}
```