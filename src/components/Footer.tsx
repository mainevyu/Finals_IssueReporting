function Footer({ onAdminAccess }: { onAdminAccess: () => void }) {
    return (
      <footer className="footer">
        <p onClick={onAdminAccess} style={{ cursor: "pointer" }}>
          © 2026 MJM Dev Team
        </p>
      </footer>
    );
  }
  
  export default Footer;