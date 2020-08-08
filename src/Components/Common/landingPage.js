import React from 'react';
import { Link } from 'react-router-dom';
import * as landingStyles from '../../styles/landingStyles.css';
import { useHistory } from 'react-router-dom';
import { categories, subCategories } from '../../Services/categories.json';
import { HeaderLogo } from '../../assets/images/icon_wedding1.png';
import { HeaderLogo2 } from '../../assets/images/icon_earrings11.png';
import { HeaderLogo3 } from '../../assets/images/ganesha.png';
import { HeaderLogo4 } from '../../assets/images/bowl.png';
import { HeaderLogo5 } from '../../assets/images/art.png';
import { TopBack } from '../../assets/images/catTopBack.jpg';
import { LightLand } from '../../assets/images/lightLanding.jpg';
// import { LandBack } from '../../assets/images/landingBackground.jpg';
// import { LandBack3 } from '../../assets/images/landBack3.jpg';
import { LandBack4 } from '../../assets/images/landBack4.jpg';
import { connect } from 'react-redux';
import { saveCatRouteRequest } from '../../Services/actions';

const LandingPage = ({ dispatchLastCatRoute }) => {
    const history = useHistory();
    // console.log('subCategories', subCategories);
    return (
        <>
            <div className={landingStyles.main}>
                <div className={landingStyles.scrollCategories}>
                    <div className={landingStyles.catScroll}>
                        {subCategories.map((subCategory) => {
                            return (
                                <Link
                                    key={subCategory.id}
                                    to={{
                                        pathname: '/categories',
                                        id: subCategory.id,
                                        name: subCategory.name,
                                        catType: 'subcats',
                                        title: subCategory.title,
                                    }}
                                    // onClick={() =>
                                    //     history.push({
                                    //         pathname: '/categories',
                                    //         search: `?id=${subCategory.id}&name=${subCategory.name}`,
                                    //     })
                                    // }
                                    className={landingStyles.scrollCategory}
                                >
                                    <div key={subCategory.id}>
                                        <img
                                            // src="/assets/images/icon_earrings3.png"
                                            src={
                                                subCategory.image
                                                    ? subCategory.image
                                                    : '/assets/images/icon_earrings3.png'
                                            }
                                            alt={subCategory.title}
                                            width="200px"
                                        />
                                        {subCategory.title}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div className={landingStyles.categoriesList}>
                    {categories.map((category) => {
                        return (
                            <Link
                                key={category.id}
                                to={{
                                    pathname: '/categories',
                                    // search: `?name=${category.name}`,
                                    id: category.id,
                                    name: category.name,
                                    title: category.title,
                                    catType: 'cats',
                                }}
                                // onClick={() => history.push(`/categories?name=${category.name}`)}
                                onClick={() =>
                                    dispatchLastCatRoute({
                                        title: category.title,
                                        name: category.name,
                                        catType: 'cats',
                                    })
                                }
                            >
                                <div className={landingStyles.category}>
                                    <div className={landingStyles.categoryName}>
                                        {category.title}
                                    </div>
                                    <div className={landingStyles.categoryIcon}>
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            width="60px"
                                        />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    dispatchLastCatRoute: (currentRoute) => {
        console.log('currentRoute', currentRoute);
        dispatch(saveCatRouteRequest(currentRoute));
    },
});

export default connect('', mapDispatchToProps)(LandingPage);
