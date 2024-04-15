#### Nested Iframe Tester

This Node.js application simulates different iframe nesting scenarios for testing cookie behaviors across various domains. It's designed to aid in the development and testing of browser extensions or web applications that handle cross-domain iframe interactions and cookie management.

#### Getting Started

##### Installation

1. **Clone the Repository**
   Clone the project to your local environment:
   ```bash
   git clone https://github.com/gagan0123/nested-iframe-tester.git
   cd nested-iframe-tester
   ```

2. **Configure Hosts**
   Ensure the necessary domain entries (`domain1.com`, `domain2.com`, etc.) are added to your hosts file pointing to `127.0.0.1`.

3. **Running the Application**
   Start the server using Lando:
   ```bash
   lando start
   ```

   After starting the server, navigate to `https://domain1.com/mixed` in your browser to begin testing.
