import { useState, useEffect } from 'react';
import { treeData } from '../careerData';
import { collegeData } from '../collegeData';

// A recursive sub-component to render each node in the tree
function TreeNode({ node, selectedNode, onNodeSelect }) {
    const [isCollapsed, setCollapsed] = useState(false);
    const isSelected = selectedNode && selectedNode.t === node.t;

    const handleNodeClick = (e) => {
        e.stopPropagation();
        onNodeSelect(node);
    };

    const handleToggle = (e) => {
        e.stopPropagation();
        setCollapsed(!isCollapsed);
    };

    return (
        <li className={`${isCollapsed ? 'collapsed' : ''} ${isSelected ? 'selected-node' : ''}`}>
            <div className="node-wrap">
                {node.c?.length ? (
                    <span className="toggle" onClick={handleToggle}>{isCollapsed ? '▶' : '▼'}</span>
                ) : (
                    <span></span>
                )}
                <a className="node" onClick={handleNodeClick}>{node.t}</a>
            </div>
            {!isCollapsed && node.c?.length > 0 && (
                <ul>
                    {node.c.map(child => (
                        <TreeNode key={child.t} node={child} selectedNode={selectedNode} onNodeSelect={onNodeSelect} />
                    ))}
                </ul>
            )}
        </li>
    );
}

export default function CareerPaths({ selectedNode, setSelectedNode, onExplore }) {
    const [relevantColleges, setRelevantColleges] = useState([]);

    useEffect(() => {
        if (selectedNode) {
            const relevant = collegeData.filter(c =>
                c.courses.some(course => selectedNode.t.toLowerCase().includes(course.toLowerCase()))
            );
            setRelevantColleges(relevant);
        }
    }, [selectedNode]);

    return (
        <section id="courses" className="tab-content active">
            <div className="courses-container">
                <div className="courses-column" id="tree-column">
                    <h3>Interactive Career Tree</h3>
                    <div id="careerTree" className="tree vertical">
                        <ul>
                            {treeData.c.map(node => (
                                <TreeNode key={node.t} node={node} selectedNode={selectedNode} onNodeSelect={setSelectedNode} />
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="courses-column" id="description-column">
                    <h3>Description</h3>
                    <div id="careerDetails" className="details-panel">
                        {selectedNode && selectedNode.details ? (
                            <>
                                <h3>{selectedNode.t}</h3>
                                <p>{selectedNode.details.summary}</p>
                                {selectedNode.details.description?.length > 0 && (
                                    <>
                                        <h4>Key Details:</h4>
                                        <ul>
                                            {selectedNode.details.description.map((item, i) => (
                                                <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="placeholder">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"> <circle cx="12" cy="12" r="10"></circle> <line x1="12" y1="16" x2="12" y2="12"></line> <line x1="12" y1="8" x2="12.01" y2="8"></line> </svg>
                                <p>Select a career from the tree to see its description.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="courses-column" id="colleges-column">
                    <h3>Relevant Colleges</h3>
                    <div id="relevantColleges" className="details-panel">
                        {selectedNode && relevantColleges.length > 0 ? (
                            <ul>
                                {relevantColleges.map(c => (
                                    <li key={c.name}><strong>{c.name}</strong> ({c.type})</li>
                                ))}
                            </ul>
                        ) : (
                            <div className="placeholder">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"> <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v2H6.5A2.5 2.5 0 0 1 4 16.5v-11A2.5 2.5 0 0 1 6.5 3H20v14H6.5A2.5 2.5 0 0 1 4 16.5z" /> <path d="M12 12l-2-1-2 1V3l4 2 4-2v9l-2 1-2-1z" /> </svg>
                                <p>Colleges related to the selected path will appear here.</p>
                            </div>
                        )}
                    </div>
                    {selectedNode && relevantColleges.length > 0 && (
                        <div id="exploreCollegesContainer">
                            <button className="action-btn" onClick={() => onExplore(relevantColleges)}>
                                Explore these Colleges
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}