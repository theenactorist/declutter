import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, ImagePlus, X } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import './AdminItemFormPage.css';

export function AdminItemFormPage() {
    const navigate = useNavigate();
    const isEditMode = false; // Will be true if ID is in URL

    const [formData, setFormData] = useState({
        name: '',
        short_description: '',
        full_description: '',
        price: '',
        category: 'living_room',
        status: 'available',
        condition_grade: 'New',
        specs: {}
    });

    const [images, setImages] = useState([]); // Temporary state for UI preview

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting', formData);
        // Real implementation will query Supabase and redirect
        navigate('/admin/dashboard');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="admin-form-page">
            <div className="admin-form-header">
                <button onClick={() => navigate(-1)} className="back-btn">
                    <ArrowLeft size={18} /> Back
                </button>
                <h1 className="admin-page-title">{isEditMode ? 'Edit Listing' : 'Add New Listing'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="form-grid">
                {/* Left Column: Details */}
                <div className="form-main-column">
                    <Card className="form-card">
                        <h2 className="form-section-title">Basic Information</h2>

                        <div className="form-group stack">
                            <Input
                                label="Item Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Minimalist Beige Sofa"
                            />
                        </div>

                        <div className="form-group stack">
                            <Input
                                label="Short Description (Card Subtitle)"
                                name="short_description"
                                value={formData.short_description}
                                onChange={handleChange}
                                required
                                placeholder="e.g. 3-Seater Living Room Sofa"
                            />
                        </div>

                        <div className="form-group stack">
                            <label className="input-label">Full Description</label>
                            <textarea
                                className="input-field textarea-field"
                                name="full_description"
                                value={formData.full_description}
                                onChange={handleChange}
                                rows={5}
                                required
                                placeholder="Describe the item, why you are selling it, etc."
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group slide">
                                <Input
                                    label="Price (₦)"
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                            <div className="form-group slide">
                                <label className="input-label">Category</label>
                                <select
                                    className="input-field"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="living_room">Living Room</option>
                                    <option value="bedroom">Bedroom</option>
                                    <option value="kitchen">Kitchen</option>
                                    <option value="appliances">Appliances</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="furniture">Furniture</option>
                                    <option value="vehicles">Vehicles</option>
                                    <option value="apparel">Apparel & Accessories</option>
                                    <option value="misc">Miscellaneous</option>
                                </select>
                            </div>
                        </div>
                    </Card>

                    <Card className="form-card">
                        <h2 className="form-section-title">Condition & Status</h2>
                        <div className="form-row">
                            <div className="form-group slide">
                                <label className="input-label">Condition Grade</label>
                                <select
                                    className="input-field"
                                    name="condition_grade"
                                    value={formData.condition_grade}
                                    onChange={handleChange}
                                >
                                    <option value="New: Never opened">New: Never opened</option>
                                    <option value="Open Box: Like New condition">Open Box: Like New condition</option>
                                    <option value="10: Preowned equipment that looks good as new; no signs of wear">10: Preowned equipment that looks good as new</option>
                                    <option value="9+: Preowned equipment that shows little to no signs of wear">9+: Preowned equipment that shows little to no wear</option>
                                    <option value="9: Very good condition; overall looks clean but may have minor signs of use/surface marks">9: Very good condition; minor signs of use</option>
                                    <option value="8+: Shows moderate wear, scuffing or marks to finish">8+: Shows moderate wear</option>
                                    <option value="8: Well used-may exhibit 'dings' or noticeable marks to finish">8: Well used noticeable marks</option>
                                    <option value="7: Shows considerable wear and above-average signs of use">7: Shows considerable wear</option>
                                </select>
                            </div>
                            <div className="form-group slide">
                                <label className="input-label">Availability Status</label>
                                <select
                                    className="input-field"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="available">Available</option>
                                    <option value="negotiation">Negotiation Ongoing</option>
                                    <option value="sold">Sold</option>
                                </select>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Images & Specs */}
                <div className="form-side-column">
                    <Card className="form-card">
                        <h2 className="form-section-title">Images</h2>
                        <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
                            Upload high-quality images. The first image will be the primary gallery photo.
                        </p>

                        <div className="image-upload-zone">
                            <ImagePlus size={32} className="text-muted" />
                            <span style={{ fontWeight: 500 }}>Click or drag images here</span>
                            <span className="text-muted" style={{ fontSize: '0.75rem' }}>JPEG, PNG up to 5MB</span>
                        </div>

                        {/* Placeholder for uploaded images */}
                        <div className="uploaded-images-preview">
                            {/* <div className="preview-thumb">
                <img src="/images/sofa.png" />
                <button className="remove-btn"><X size={14}/></button>
              </div> */}
                        </div>
                    </Card>

                    <div className="form-actions sticky-actions">
                        <Button type="button" variant="secondary" onClick={() => navigate(-1)} fullWidth>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" fullWidth>
                            <Save size={18} /> {isEditMode ? 'Save Changes' : 'Create Listing'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
