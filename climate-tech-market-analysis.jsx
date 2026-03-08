import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ClimateMarketAnalysis = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Market Size Data
  const marketOverview = {
    totalMarket2025: 31.45,
    totalMarket2032: 149.27,
    cagr: 24.9,
    usMarket2025: 6.57,
    funding2024: 17.0,
    medianRaise: 2.1
  };

  // Vertical Breakdown by Share & Growth (Updated with Circular Economy)
  const verticalData = [
    { 
      name: 'Energy & Power', 
      share: 27, 
      cagr: 29.5,
      description: 'Renewables, smart grids, battery storage, hydrogen',
      designMaturity: 'Low-Medium',
      engagementCritical: 'High',
      fit: 'Excellent',
      examples: 'Consumer energy apps, demand response platforms, microgrid management'
    },
    { 
      name: 'Food & Agriculture', 
      share: 18, 
      cagr: 26.5,
      description: 'Precision ag, regenerative farming, alt-protein, supply chain',
      designMaturity: 'Low',
      engagementCritical: 'Very High',
      fit: 'Excellent',
      examples: 'Farm management platforms, food waste reduction, sustainable supply chains'
    },
    { 
      name: 'Circular Economy', 
      share: 14, 
      cagr: 23.7,
      description: 'Reuse, repair, remanufacturing, sharing platforms, zero waste',
      designMaturity: 'Very Low',
      engagementCritical: 'Very High',
      fit: 'Excellent',
      examples: 'Product-as-service, sharing economy, textile recycling, e-waste recovery'
    },
    { 
      name: 'Transportation & Mobility', 
      share: 13, 
      cagr: 24.0,
      description: 'EVs, fleet management, micromobility, logistics optimization',
      designMaturity: 'Medium',
      engagementCritical: 'High',
      fit: 'Very Good',
      examples: 'Fleet tracking, charging apps, route optimization, shared mobility'
    },
    { 
      name: 'Climate Resilience & Adaptation', 
      share: 9, 
      cagr: 25.0,
      description: 'Risk assessment, monitoring, early warning systems',
      designMaturity: 'Low',
      engagementCritical: 'Medium',
      fit: 'Very Good',
      examples: 'Climate risk platforms, disaster preparedness tools, adaptation planning'
    },
    { 
      name: 'Buildings & Construction', 
      share: 8, 
      cagr: 23.5,
      description: 'Green building materials, smart building tech, retrofit',
      designMaturity: 'Medium',
      engagementCritical: 'Medium',
      fit: 'Good',
      examples: 'Building energy management, sustainable materials marketplaces'
    },
    { 
      name: 'Carbon Tech & Removal', 
      share: 6, 
      cagr: 22.0,
      description: 'DAC, carbon tracking, offsets, sequestration',
      designMaturity: 'Low',
      engagementCritical: 'Low-Medium',
      fit: 'Good',
      examples: 'Corporate carbon accounting, offset marketplaces, removal verification'
    },
    { 
      name: 'Industrial Decarbonization', 
      share: 5, 
      cagr: 21.0,
      description: 'Green steel, chemicals, cement, heavy manufacturing',
      designMaturity: 'Medium',
      engagementCritical: 'Low',
      fit: 'Fair',
      examples: 'Process optimization software, supply chain tracking'
    }
  ];

  // TAM Calculation for ThriveKite
  const tamCalculation = {
    totalClimateTech2025: 31450, // million USD
    growthStagePercent: 45, // % of companies in growth stage
    under50Employees: 60, // % of growth stage under 50 employees
    designImmature: 70, // % of under-50 companies that are design-immature
    engagementDependent: 55, // % that depend on engagement/adoption
    avgProjectValue: 75000, // avg project value
    avgAnnualRetainer: 120000 // avg annual advisory
  };

  const calculateTAM = () => {
    const growthStageMarket = tamCalculation.totalClimateTech2025 * (tamCalculation.growthStagePercent / 100);
    const under50Market = growthStageMarket * (tamCalculation.under50Employees / 100);
    const designImmatureMarket = under50Market * (tamCalculation.designImmature / 100);
    const targetMarket = designImmatureMarket * (tamCalculation.engagementDependent / 100);
    
    // Estimate number of companies (assuming avg company size of $2M in this segment)
    const estimatedCompanies = Math.round(targetMarket / 2);
    const projectTAM = estimatedCompanies * tamCalculation.avgProjectValue / 1000000;
    const retainerTAM = estimatedCompanies * tamCalculation.avgAnnualRetainer / 1000000;
    
    return {
      targetMarket: targetMarket.toFixed(0),
      estimatedCompanies,
      projectTAM: projectTAM.toFixed(0),
      retainerTAM: retainerTAM.toFixed(0),
      totalTAM: (projectTAM + retainerTAM).toFixed(0)
    };
  };

  const tam = calculateTAM();

  // Best Fit Scoring
  const scoringCriteria = [
    { criteria: 'Design Immaturity', weight: 25 },
    { criteria: 'Engagement-Critical', weight: 30 },
    { criteria: 'Growth Rate', weight: 20 },
    { criteria: 'Market Size', weight: 15 },
    { criteria: 'Funding Availability', weight: 10 }
  ];

  const getFitColor = (fit) => {
    const colors = {
      'Excellent': '#22c55e',
      'Very Good': '#84cc16',
      'Good': '#eab308',
      'Fair': '#f97316'
    };
    return colors[fit] || '#94a3b8';
  };

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#6366f1'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Climate Tech Market Analysis</h1>
          <p className="text-slate-600 text-lg">ThriveKite's Addressable Market & Best-Fit Verticals</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 bg-white rounded-lg p-2 shadow-md">
          {['overview', 'tam', 'verticals', 'insights'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-md font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-sm text-slate-500 mb-2">Total Market Size 2025</div>
                <div className="text-3xl font-bold text-blue-600">${marketOverview.totalMarket2025}B</div>
                <div className="text-sm text-slate-600 mt-2">Growing to ${marketOverview.totalMarket2032}B by 2032</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-sm text-slate-500 mb-2">Market Growth Rate</div>
                <div className="text-3xl font-bold text-green-600">{marketOverview.cagr}%</div>
                <div className="text-sm text-slate-600 mt-2">CAGR (2025-2032)</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-sm text-slate-500 mb-2">2024 VC Funding</div>
                <div className="text-3xl font-bold text-purple-600">${marketOverview.funding2024}B</div>
                <div className="text-sm text-slate-600 mt-2">Median raise: ${marketOverview.medianRaise}M</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Market Distribution by Vertical</h2>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={verticalData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, share }) => `${name}: ${share}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="share"
                  >
                    {verticalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Key Market Insights</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Energy & power lead with 27% market share and highest growth (29.5% CAGR)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Food & agriculture (18%) shows exceptional engagement needs - farmers must actively use platforms for ROI</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Circular economy (14%) is a standout opportunity:</strong> High engagement needs (supply + demand sides), very low design maturity, aligns perfectly with ThriveKite's behavioral design approach</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Digital circular economy market growing at 28% CAGR - faster than broader climate tech</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Funding consolidating: fewer deals, larger check sizes in 2025, favoring Series B+ companies</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAM Tab */}
        {activeTab === 'tam' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Total Addressable Market (TAM)</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-700 mb-4">Market Funnel</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-slate-600">Total Climate Tech Market</div>
                      <div className="text-2xl font-bold text-slate-800">${tamCalculation.totalClimateTech2025}M</div>
                    </div>
                    <div className="flex items-center text-slate-500">
                      <span className="mr-2">↓</span>
                      <span className="text-sm">{tamCalculation.growthStagePercent}% Growth Stage</span>
                    </div>
                    <div className="flex items-center text-slate-500">
                      <span className="mr-2">↓</span>
                      <span className="text-sm">{tamCalculation.under50Employees}% Under 50 employees</span>
                    </div>
                    <div className="flex items-center text-slate-500">
                      <span className="mr-2">↓</span>
                      <span className="text-sm">{tamCalculation.designImmature}% Design-immature</span>
                    </div>
                    <div className="flex items-center text-slate-500">
                      <span className="mr-2">↓</span>
                      <span className="text-sm">{tamCalculation.engagementDependent}% Engagement-dependent</span>
                    </div>
                    <div className="pt-3 border-t border-slate-300">
                      <div className="text-sm text-slate-600">Your Target Market</div>
                      <div className="text-3xl font-bold text-blue-600">${tam.targetMarket}M</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-700 mb-4">Revenue Opportunity</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-slate-600">Estimated Target Companies</div>
                      <div className="text-3xl font-bold text-green-600">{tam.estimatedCompanies.toLocaleString()}</div>
                      <div className="text-xs text-slate-500 mt-1">Growth-stage, design-immature companies</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-300">
                      <div>
                        <div className="text-xs text-slate-600 mb-1">Project-Based TAM</div>
                        <div className="text-xl font-bold text-slate-800">${tam.projectTAM}M</div>
                        <div className="text-xs text-slate-500">@ ${(tamCalculation.avgProjectValue/1000).toFixed(0)}K avg</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-600 mb-1">Retainer TAM</div>
                        <div className="text-xl font-bold text-slate-800">${tam.retainerTAM}M</div>
                        <div className="text-xs text-slate-500">@ ${(tamCalculation.avgAnnualRetainer/1000).toFixed(0)}K avg</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-300">
                      <div className="text-sm text-slate-600">Combined TAM</div>
                      <div className="text-4xl font-bold text-green-600">${tam.totalTAM}M</div>
                      <div className="text-xs text-slate-500 mt-1">Annual revenue opportunity</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                <div className="font-semibold text-amber-900 mb-2">Key Assumptions & Market Context</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-800">
                  <div>• 45% of market is growth-stage companies</div>
                  <div>• 60% of growth-stage have &lt;50 employees</div>
                  <div>• 70% lack design maturity</div>
                  <div>• 55% depend on user engagement</div>
                  <div>• Average project: $75K</div>
                  <div>• Average retainer: $120K/year</div>
                </div>
                <div className="mt-3 pt-3 border-t border-amber-300 text-sm text-amber-900">
                  <strong>Circular Economy Context:</strong> The digital circular economy market ($4.4B in 2025, 28% CAGR) represents a high-concentration subset of your TAM. Nearly all circular economy models are engagement-dependent with low design maturity - these companies are ideal prospects.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Verticals Tab */}
        {activeTab === 'verticals' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Best-Fit Verticals Analysis</h2>
              
              <div className="mb-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={verticalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={120} />
                    <YAxis label={{ value: 'CAGR %', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cagr" fill="#3b82f6" name="Growth Rate %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                {verticalData
                  .sort((a, b) => {
                    const fitOrder = { 'Excellent': 4, 'Very Good': 3, 'Good': 2, 'Fair': 1 };
                    return fitOrder[b.fit] - fitOrder[a.fit];
                  })
                  .map((vertical, idx) => (
                    <div 
                      key={idx} 
                      className="bg-slate-50 rounded-lg p-5 border-l-4 hover:shadow-md transition-shadow"
                      style={{ borderLeftColor: getFitColor(vertical.fit) }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-slate-800">{vertical.name}</h3>
                          <p className="text-sm text-slate-600 mt-1">{vertical.description}</p>
                          {vertical.examples && (
                            <p className="text-xs text-slate-500 mt-2 italic">Examples: {vertical.examples}</p>
                          )}
                        </div>
                        <div 
                          className="px-4 py-2 rounded-full font-semibold text-sm text-white whitespace-nowrap ml-4"
                          style={{ backgroundColor: getFitColor(vertical.fit) }}
                        >
                          {vertical.fit} Fit
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-500">Market Share</div>
                          <div className="font-bold text-slate-800">{vertical.share}%</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Growth Rate</div>
                          <div className="font-bold text-slate-800">{vertical.cagr}%</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Design Maturity</div>
                          <div className="font-bold text-slate-800">{vertical.designMaturity}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Engagement Critical</div>
                          <div className="font-bold text-slate-800">{vertical.engagementCritical}</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Scoring Criteria</h3>
              <div className="space-y-2">
                {scoringCriteria.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-700">{item.criteria}</span>
                    <span className="font-semibold text-blue-600">{item.weight}% weight</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Strategic Insights & Recommendations</h2>
              
              <div className="space-y-6">
                <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-green-900 mb-3">🎯 Top Priority Verticals</h3>
                  <div className="space-y-3 text-green-800">
                    <div>
                      <div className="font-semibold">1. Circular Economy (14% market share, 23.7% CAGR)</div>
                      <div className="text-sm mt-1"><strong>Why it's #1:</strong> Double-sided engagement challenge (supply + demand), extremely low design maturity, perfect alignment with behavioral design. Companies like Gone.com exemplify this - they need users to adopt circular behaviors AND businesses to participate. This is exactly where ThriveKite's behavior-centered design creates massive value.</div>
                      <div className="text-sm mt-2 italic">Sub-segments: Product-as-service, sharing platforms, textile/fashion circularity, e-waste recovery, construction material reuse, food waste reduction</div>
                    </div>
                    <div>
                      <div className="font-semibold">2. Food & Agriculture (18% share, 26.5% CAGR)</div>
                      <div className="text-sm mt-1">Second-largest climate tech vertical with critical engagement needs. Farm management platforms must be used daily to deliver value. Low design maturity across the sector. Direct connection to Community Gearbox experience.</div>
                      <div className="text-sm mt-2 italic">Sub-segments: Precision agriculture, food waste reduction, regenerative farming platforms, sustainable supply chains</div>
                    </div>
                    <div>
                      <div className="font-semibold">3. Energy & Power (27% share, 29.5% CAGR)</div>
                      <div className="text-sm mt-1">Largest vertical with highest growth. Consumer-facing energy apps (demand response, smart home energy) have high engagement needs. Mix of mature and immature design - target newer entrants.</div>
                      <div className="text-sm mt-2 italic">Sub-segments: Consumer energy apps, microgrid management, community solar platforms, energy sharing</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">💡 Market Positioning</h3>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span><strong>Sweet Spot:</strong> Companies with $2-10M funding that have product-market fit but struggling with adoption/engagement metrics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span><strong>Circular Economy Angle:</strong> "Most circular economy models fail because of behavioral barriers, not technical ones. We design the engagement loops that make circular behaviors stick - on both the supply and demand side."</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span><strong>Value Prop:</strong> "We turn your technically-sound solution into one people actually use repeatedly" - emphasize sustained engagement, not one-time adoption</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span><strong>Entry Point:</strong> Design sprints ($50-75K) converting to fractional partnerships ($10-15K/month)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span><strong>Proof Points:</strong> Lead with engagement metrics - "Increased repeat usage by X%", "Reduced drop-off by Y%", "Doubled stakeholder participation"</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
                  <h3 className="text-xl font-bold text-purple-900 mb-3">🔍 Channel Strategy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-800">
                    <div>
                      <div className="font-semibold mb-2">High-Value Events</div>
                      <ul className="space-y-1 ml-4">
                        <li>• Climate Tech VC conferences</li>
                        <li>• Greentown Labs events</li>
                        <li>• Energy sector meetups</li>
                        <li>• AgTech forums</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold mb-2">Partner Ecosystem</div>
                      <ul className="space-y-1 ml-4">
                        <li>• Climate-focused VCs (warm intros)</li>
                        <li>• Accelerators (Techstars, Y Combinator)</li>
                        <li>• Product development firms</li>
                        <li>• User research consultancies</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-lg p-6 border-l-4 border-amber-500">
                  <h3 className="text-xl font-bold text-amber-900 mb-3">⚠️ Market Headwinds to Watch</h3>
                  <ul className="space-y-2 text-amber-800 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Early-stage funding down 20% in 2025 - may need to target Series A+ companies with existing runway</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Series C becoming "valley of death" - opportunity to help companies prove engagement metrics for next round</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Market consolidation happening - position as essential partner for companies that need to differentiate</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border-l-4 border-indigo-500">
                  <h3 className="text-xl font-bold text-indigo-900 mb-3">📈 Growth Opportunities</h3>
                  <div className="space-y-3 text-indigo-800 text-sm">
                    <div>
                      <div className="font-semibold">AI-Powered Startup Package</div>
                      <div className="mt-1">Huge opportunity in current market. ~3,000 early-stage climate companies could benefit. Price at $15-25K for broader reach.</div>
                    </div>
                    <div>
                      <div className="font-semibold">Behavior Design Workshops</div>
                      <div className="mt-1">Group sessions for accelerator cohorts ($5K per company, 8-10 companies per cohort). Build pipeline while generating revenue.</div>
                    </div>
                    <div>
                      <div className="font-semibold">Success Metric Frameworks</div>
                      <div className="mt-1">Productize engagement measurement methodology. License to VCs to help portfolio companies ($25K annual license).</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClimateMarketAnalysis;