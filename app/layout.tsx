import '@/assets/styles/globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
        <html>
            <body>
                <Navbar></Navbar>
                <main>
                    {children}
                </main>
                <Footer></Footer>
            </body>
        </html>
    );
}

export default MainLayout;