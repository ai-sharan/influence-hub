import { useState } from "react"
import axios from "axios"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [userRole, setUserRole] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      })
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("role", res.data.user.role)
      setUserName(res.data.user.name)
      setUserRole(res.data.user.role)
      setLoggedIn(true)
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (loggedIn) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={{ fontSize: 64, marginBottom: 16, textAlign: "center" }}>
            {userRole === "influencer" ? "🎯" : userRole === "business" ? "🏢" : "🛡️"}
          </div>
          <h2 style={styles.welcomeName}>Welcome, {userName}!</h2>
          <p style={styles.welcomeRole}>
            Signed in as{" "}
            <span style={{ color: "#C4622D", fontWeight: 600 }}>{userRole}</span>
          </p>
          <button
            style={styles.btnPrimary}
            onClick={() => {
              localStorage.removeItem("token")
              localStorage.removeItem("role")
              setLoggedIn(false)
              setEmail("")
              setPassword("")
            }}>
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>

        {/* LOGO */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={styles.logo}>
            Influence<span style={{ color: "#C4622D" }}>Hub</span>
          </h1>
          <p style={styles.tagline}>Connect · Collaborate · Grow</p>
        </div>

        {/* CARD */}
        <div style={styles.card}>

          <h2 style={styles.cardTitle}>Welcome back</h2>
          <p style={styles.cardSub}>Sign in to your account</p>

          {/* ERROR */}
          {error && (
            <div style={styles.errorBox}>{error}</div>
          )}

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
                onFocus={e => e.target.style.borderColor = "#C4622D"}
                onBlur={e => e.target.style.borderColor = "#E8DDD4"}
              />
            </div>

            {/* PASSWORD */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ ...styles.input, paddingRight: 56 }}
                  onFocus={e => e.target.style.borderColor = "#C4622D"}
                  onBlur={e => e.target.style.borderColor = "#E8DDD4"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.showBtn}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* FORGOT */}
            <div style={{ textAlign: "right", marginBottom: 20 }}>
              <button type="button" style={styles.forgotBtn}>
                Forgot password?
              </button>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.btnPrimary,
                width: "100%",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer"
              }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

          {/* REGISTER LINK */}
          <p style={styles.switchText}>
            Don't have an account?{" "}
            <button style={styles.switchBtn}>Register here</button>
          </p>

        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    backgroundColor: "#FDFAF7",
    backgroundImage: "radial-gradient(ellipse at 20% 20%, rgba(196,98,45,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(92,138,107,0.05) 0%, transparent 60%)",
  },
  wrapper: {
    width: "100%",
    maxWidth: 420,
  },
  logo: {
    fontFamily: "Playfair Display, serif",
    fontSize: 38,
    fontWeight: 700,
    color: "#2C1810",
    margin: 0,
  },
  tagline: {
    fontSize: 13,
    color: "#9C6B45",
    marginTop: 4,
    letterSpacing: "0.05em",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: "36px 36px",
    boxShadow: "0 4px 40px rgba(44,24,16,0.08), 0 1px 4px rgba(44,24,16,0.04)",
    border: "1px solid #EDE5DC",
  },
  cardTitle: {
    fontFamily: "Playfair Display, serif",
    fontSize: 22,
    fontWeight: 600,
    color: "#2C1810",
    margin: "0 0 4px 0",
  },
  cardSub: {
    fontSize: 14,
    color: "#9C6B45",
    margin: "0 0 24px 0",
    fontWeight: 300,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: "#6B4423",
    marginBottom: 6,
    fontFamily: "DM Sans, sans-serif",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "1.5px solid #E8DDD4",
    borderRadius: 12,
    fontSize: 14,
    color: "#2C1810",
    backgroundColor: "#FDFAF7",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "DM Sans, sans-serif",
    boxSizing: "border-box",
  },
  showBtn: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    fontSize: 12,
    color: "#9C6B45",
    cursor: "pointer",
    fontFamily: "DM Sans, sans-serif",
  },
  forgotBtn: {
    background: "none",
    border: "none",
    fontSize: 12,
    color: "#9C6B45",
    cursor: "pointer",
    fontFamily: "DM Sans, sans-serif",
  },
  btnPrimary: {
    backgroundColor: "#C4622D",
    color: "white",
    border: "none",
    borderRadius: 12,
    padding: "13px 24px",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "DM Sans, sans-serif",
    transition: "opacity 0.2s, transform 0.1s",
    letterSpacing: "0.2px",
  },
  errorBox: {
    backgroundColor: "#FEE2E2",
    border: "1px solid #FECACA",
    color: "#DC2626",
    fontSize: 13,
    padding: "11px 14px",
    borderRadius: 10,
    marginBottom: 16,
    fontFamily: "DM Sans, sans-serif",
  },
  welcomeName: {
    fontFamily: "Playfair Display, serif",
    fontSize: 28,
    fontWeight: 600,
    color: "#2C1810",
    textAlign: "center",
    margin: "0 0 8px 0",
  },
  welcomeRole: {
    fontSize: 14,
    color: "#9C6B45",
    textAlign: "center",
    margin: "0 0 28px 0",
  },
  switchText: {
    textAlign: "center",
    fontSize: 13,
    color: "#9C6B45",
    marginTop: 20,
    fontFamily: "DM Sans, sans-serif",
  },
  switchBtn: {
    background: "none",
    border: "none",
    color: "#C4622D",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "DM Sans, sans-serif",
    fontSize: 13,
  },
}