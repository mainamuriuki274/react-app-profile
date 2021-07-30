import Main from "../components/Main/Main";

const Home = (props) => {
    return ( 
        <Main token={props.token}
            pageContent = {[
                <h1>prometheus - Homepage</h1>
            ]}
        />
     );
}
 
export default Home;