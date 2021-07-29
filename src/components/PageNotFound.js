import pageNotFound from '../images/page_not_found.png'
import Information from '../components/Information/Information';

const PageNotFound = () => {
    return ( 
        <Information
            img={pageNotFound}
            title="Oops! Page not found"
            description="The Page you are looking for doesn’t exist or another error occured. "
            buttonName="Go to homepage"
            nextUrl="/"
        />
     );
}
 
export default PageNotFound;