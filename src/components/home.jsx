import './../mbr-additional.css'
const dbImage = require('./dashboard.JPG');
const {GiPayMoney, GiTowerFlag } = require('react-icons/gi');
const {MdMobileFriendly} = require('react-icons/md');
const {SiBookstack} = require('react-icons/si');
const Home = () => {
    return (
        <>
        <Welcome />
        <Features />
        </>
    );
    };

    const Welcome = () => {
        return (

            <>        
            <section className="header10 cid-tqnsI4AqmB" id="header10-0">
            <div className="align-center container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-9">
                        <h1 className="mbr-section-title mbr-fonts-style mb-3 display-1"><strong>Welcome to pilot logger</strong></h1>
                        <p className="mbr-text mbr-fonts-style display-7">The place where you can log your flights, find plane information and keep track of your licenses in one place.</p>
                        
                        <div className="image-wrap mt-4">
                            <img src={dbImage} alt="dashboard" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    
        );
    };

    const Features = () => {
        return (
            <>
            <section className="features1 cid-tqnsOqrcUK" id="features2-1">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-3">
                <div className="card-wrapper">
                    <div className="card-box align-center">
                        <span className="mbr-iconfont mobi-mbri-code mobi-mbri"><GiPayMoney/></span>
                        <h4 className="card-title align-center mbr-black mbr-fonts-style display-7">
                            <strong>Free to use</strong></h4>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
                <div className="card-wrapper">
                    <div className="card-box align-center">
                        <span className="mbr-iconfont mobi-mbri-devices mobi-mbri"><MdMobileFriendly/></span>
                        <h4 className="card-title align-center mbr-black mbr-fonts-style display-7">
                            <strong>Mobile Friendly</strong>
                        </h4>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
                <div className="card-wrapper">
                    <div className="card-box align-center">
                        <span className="mbr-iconfont mobi-mbri-website-theme-2 mobi-mbri"><GiTowerFlag/></span>
                        <h4 className="card-title align-center mbr-black mbr-fonts-style display-7">
                            <strong>Unique</strong>
                        </h4>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
                <div className="card-wrapper">
                    <div className="card-box align-center">
                        <span className="mbr-iconfont mobi-mbri-sites mobi-mbri"><SiBookstack/></span>
                        <h4 className="card-title align-center mbr-black mbr-fonts-style display-7">
                            <strong>Unlimited flight logs</strong></h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
            </>
        );
    };



    export default Home;