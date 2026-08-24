import '@/assets/styles/globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthProvider from './components/AuthProvider';

export const metadata = {
    title: {
        default: 'Lawrence Edition',
        template: "%s | Lawrence Edition"
    },
    keywords: 'rent, property rental, real estate',
    description: 'Search available to rent properties'
}

const MainLayout = ({ children }) => {
    return (
        <AuthProvider>
            <html>
                <body>
                    <Navbar></Navbar>
                    <main>
                        {children}
                    </main>
                    <Footer></Footer>
                </body>
            </html>
        </AuthProvider>
    );
}

export default MainLayout;