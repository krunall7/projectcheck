import { initializeApp, getApps, cert } from 'firebase-admin/app';

const firebaseAdminConfig = {
    credential: cert({
        projectId: "renzo-newbie",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCFv9cJ8UAran2u\n3qobVa+NXJEHyShqphA2bkB96H6kN1N0KKMQ8uG88pkF91QEwQsj3e0u0b8L2uXG\nPy37+5mwtAGqHXsLwVhv01oQx85t3sKifm3mvIWu7tenSVgXkaFKMIK7Rz9VbN1C\nmmH1RVZg2AcWsLeC4lwVnPpfZ54I7zL05lSOQ5Sfr8eSojODoHYl9HwQKOiN0YEa\nbvUAEcaTzW3JiduTP1DpI8IRYap7u8WH8nXna8wnOBbMbZCz07VkzRXhhhsD9hag\nHYSHPZFKvbqw+1MlhulLLrRfsYfQ3M2K9ZkYrlElsXgH7vlgVB8+UMWjn6292Peb\n84KDsmMZAgMBAAECggEABjAoNVli9Cny/bER+BN1/K7bNkaBfF8JjKh7iw0Y4Dp/\nvctBhtUN9QLZFJ8VqpCkliNm8rhumTr7+uOib4WmXeK+LvjlNVfb4nSfYVEKmn0T\neUGAjovguDAXFzImsBR4p2jo1jGyMEl0pT0PqjGWkQLTCng2TV5xZJNE5ulxijfh\n1AZOu/nrJNuzTXvr8q+NmTlrbppcSrOu47YOLDaOvgPylDYzxqO+rbFnkpU3g5jV\nH+4Vi2RixWaw8WYewyd2cF1LtrUelsPu/dZS1PSMUyypHcWUS9cyRwB0Y3qhy97o\nrZQfNmJxj9zyzP2sHNZSq5h6nHul0Vqm/YGzlWYs+QKBgQC6ScMZElFnE6C9OUkK\nPH7TL1MDsvVh/4vmuO7gmTTZ+oJakGHVBAniuvFnuvPVlLw0ozsRYPYxWKalMMkI\nfe3Wb8EiEHccgdtWkhpNikSORE9uJVQQ7NZtpk1Xwk/vw68UJP79NQ9gB4YokcC7\ncIhuPsSC+k0qMYpTde12FzDOXQKBgQC3zOlVxgwAtN1eeudQ0sZ8jagu3hWMZ3cZ\nLDBKeCpVnwSyQhwxUk5hUxIXzzFqSQ92QyjhVw8UyAAAXkWxEIwzUMILCLmOWvEp\naYUipUawrMT7anTkPuU9ljZj3fslNwmgiQgsbfFuv8N+A8hptjw4JXUjRX4NqH6f\nod0JeXVD7QKBgQCiNZxmdmbfZF3wprMM8MRWS7zzWZ8FqCk/zARlGcLFk7Zx+YrW\nm1+oR7Pw6P9tGMgQ5ZmHdnCpY1IoQSSr+kthD4qSiNfOwNwms62nmyA66QxpEqPy\n4OeOLuLl6dMFKdWHqvdFsDAlJCgTp2a1UDXcGVev3RfYB681IViWHXdoGQKBgCzg\nEeRIS2vsvNOxjEKWg7GrYHG49WfnZxO1T0EPX76x6ZKgQ4PjRZHLl3JKuxTpK6ZD\nNXr3J456Wk28tqVJlgF9aTMKeUuBdroWslPIKJ9AP4Pm9Q05Mf08bKErdIMckfQp\nIN7AJR9WIKPmxorQ3JkUxCnNcL5i8i+FdJM4nWHtAoGAIcup0zVwQaV1UjY/FBqP\nBCazRYFBODdjiMU6N70yJjrEBCS3nG6z8J3TJM6MmhWge4SvuNN4lVSLTYpw8WzL\n1XfIEVVEkAZ91P7pC4YpPTDTFioFJ5lXTpOqsxJ0XPFBqOd+wMln4fIeqJBiVwXy\nqdpik+/MpDSYAT+t12GcfNo=\n-----END PRIVATE KEY-----\n",
        clientEmail: "firebase-adminsdk-pohac@renzo-newbie.iam.gserviceaccount.com"
    })
}

export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}
