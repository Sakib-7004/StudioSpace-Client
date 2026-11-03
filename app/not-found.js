import Link from "next/link";
export default function NotFound(){
 return <div className="not-found"><div className="container"><strong>404</strong><h1>Looks like this studio is off the map.</h1><p className="muted">The page you're looking for may have moved or no longer exists.</p><Link className="button button-primary" href="/">Return to home</Link></div></div>;
}
