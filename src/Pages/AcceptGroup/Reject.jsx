const styles = {
     body: {
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          backgroundColor: 'white',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
     },
     header: {
          backgroundColor: '#3498db',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
     },
     headerTitle: {
          margin: 0,
          fontSize: '24px',
     },
     main: {
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
     },
     card: {
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          padding: '40px',
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
     },
     icon: {
          width: '80px',
          height: '80px',
          marginBottom: '20px',
     },
     title: {
          color: '#2c3e50',
          marginBottom: '20px',
          fontSize: '28px',
     },
     message: {
          color: '#34495e',
          marginBottom: '20px',
          fontSize: '18px',
     },
     groupName: {
          color: '#3498db',
          marginBottom: '30px',
          fontSize: '24px',
     },
     detailsBox: {
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '30px',
          textAlign: 'left',
     },
     detailsTitle: {
          color: '#2c3e50',
          marginBottom: '10px',
          fontSize: '18px',
     },
     detailsText: {
          color: '#34495e',
          marginBottom: '5px',
          fontSize: '16px',
     },
     infoText: {
          color: '#7f8c8d',
          marginBottom: '30px',
          fontSize: '16px',
     },
     button: {
          display: 'inline-block',
          padding: '12px 24px',
          fontSize: '16px',
          color: 'white',
          backgroundColor: '#3498db',
          textDecoration: 'none',
          borderRadius: '6px',
          transition: 'background-color 0.3s',
          cursor: 'pointer',
     },
     footer: {
          backgroundColor: '#f8f9fa',
          color: '#7f8c8d',
          textAlign: 'center',
          padding: '20px',
          fontSize: '14px',
     },
     link: {
          color: '#3498db',
          textDecoration: 'none',
     },
}

export default function Reject() {
     return (
          <div>
               <div style={styles.body}>
                    <header style={styles.header}>
                         <h1 style={styles.headerTitle}>TeamConnect Notifications</h1>
                    </header>

                    <main style={styles.main}>
                         <div style={styles.card}>
                              <svg style={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <circle cx="12" cy="12" r="10" stroke="#e74c3c" strokeWidth="2" />
                                   <path d="M15 9L9 15" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                   <path d="M9 9L15 15" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>

                              <h2 style={styles.title}>Invitation Rejected</h2>

                              <p style={styles.message}>
                                   You have successfully rejected the invitation to join the group:
                              </p>
                              <h3 style={styles.groupName}>Awesome Team</h3>

                              <div style={styles.detailsBox}>
                                   <h4 style={styles.detailsTitle}>Rejection Details:</h4>
                                   <p style={styles.detailsText}><strong>Group:</strong> Awesome Team</p>
                                   <p style={styles.detailsText}><strong>Inviter:</strong> John Doe</p>
                                   <p style={styles.detailsText}><strong>Rejected on:</strong> {new Date().toLocaleString()}</p>
                                   <p style={styles.detailsText}><strong>Status:</strong> Invitation Declined</p>
                              </div>

                              <p style={styles.infoText}>
                                   If you change your mind or have any questions, please contact the group administrator or our support team.
                              </p>

                              <button
                                   style={styles.button}
                                   onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
                                   onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
                                   onClick={() => console.log('Navigating to home...')}
                              >
                                   Back to Home
                              </button>
                         </div>
                    </main>

                    <footer style={styles.footer}>
                         <p>&copy; 2024 TeamConnect. All rights reserved.</p>
                         <p>If you have any questions, please contact <a href="mailto:support@teamconnect.com" style={styles.link}>support@teamconnect.com</a></p>
                    </footer>
               </div>
          </div>
     )
}
