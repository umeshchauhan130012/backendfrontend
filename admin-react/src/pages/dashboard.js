import React from 'react';
import HorizontalCard from '../components/horizontalCard';
import Socialmedia from '../components/socialmedia';
import TagsCards from '../components/tagsCards';
import CategoryCard from '../components/categoryCard';
import ProtectedRoute from '../components/protectedRouts';
import StoryCard from '../components/storyCard';
import Div from '../components/div';

const Dashboard = () => {
    return (
        <ProtectedRoute> 
            <Div className="custom-container">
                <Div className="custom-row">
                    <Div className="custom-col-12">
                        <Div className="custom-section-title">
                            <h4>Site Reports</h4>
                        </Div>
                    </Div>
                </Div>  
                <Div className="custom-row">
                    <Div className="custom-col-3 custom-col-sm-6">
                        <StoryCard title="All Story" cardType="Story"/>
                    </Div>
                    <Div className="custom-col-3 custom-col-sm-6">
                        <HorizontalCard />
                    </Div>
                    <Div className="custom-col-3 custom-col-sm-6">
                        <CategoryCard title="All Categories" cardType="Category" />
                    </Div>
                    <Div className="custom-col-3 custom-col-sm-6">
                        <TagsCards title="All Tags" cardType="Tags" />
                    </Div>
                </Div> 
            </Div>
            <Div className="custom-container">
                <Div className="custom-row">
                    <Div className="custom-col-9">
                        <Div className="custom-row"> 
                            <Div className="custom-col-6">
                                <Div className="chart-wrapper">
                                    <Div id="revenu-chart"></Div>
                                </Div>
                            </Div>
                            <Div className="custom-col-6">
                                <Div className="chart-wrapper">
                                    <Div id="chart"></Div>
                                </Div>
                            </Div>
                        </Div>  
                    </Div>
                    <Div className="custom-col-3">
                        <Div className="custom-row">
                            <Div className="custom-col-12">
                                <Div className="custom-section-title">
                                    <h4>Social Media Reports</h4>
                                </Div>
                            </Div>
                        </Div>
                        <Div className="custom-row">
                            <Socialmedia />
                        </Div>
                    </Div>
                </Div>
            </Div>
        </ProtectedRoute>
    );
}

export default Dashboard;
