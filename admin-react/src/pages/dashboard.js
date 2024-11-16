import React from 'react';
import HorizontalCard from '../components/horizontalCard';
import Socialmedia from '../components/socialmedia';
import TagsCards from '../components/tagsCards';
import CategoryCard from '../components/categoryCard';
import ProtectedRoute from '../components/protectedRouts';
import StoryCard from '../components/storyCard';

const Dashboard = () => {
    return (
        <ProtectedRoute> 
            <div className="custom-container">
                <div className="custom-row">
                    <div className="custom-col-12">
                        <div className="custom-section-title">
                            <h4>Site Reports</h4>
                        </div>
                    </div>
                </div>
                <div className="custom-row">
                    <div className="custom-col-3 custom-col-sm-6">
                        <StoryCard title="All Story" cardType="Story"/>
                    </div>
                    <div className="custom-col-3 custom-col-sm-6">
                        <HorizontalCard />
                    </div>
                    <div className="custom-col-3 custom-col-sm-6">
                        <CategoryCard title="All Categories" cardType="Category" />
                    </div>
                    <div className="custom-col-3 custom-col-sm-6">
                        <TagsCards title="All Tags" cardType="Tags" />
                    </div>
                </div> 
            </div>
            <div className="custom-container">
                <div className="custom-row">
                    <div className="custom-col-9">
                        <div className="custom-row"> 
                            <div className="custom-col-6">
                                <div className="chart-wrapper">
                                    <div id="revenu-chart"></div>
                                </div>
                            </div>
                            <div className="custom-col-6">
                                <div className="chart-wrapper">
                                    <div id="chart"></div>
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div className="custom-col-3">
                        <div className="custom-row">
                            <div className="custom-col-12">
                                <div className="custom-section-title">
                                    <h4>Social Media Reports</h4>
                                </div>
                            </div>
                        </div>
                        <div className="custom-row">
                            <Socialmedia />
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

export default Dashboard;
