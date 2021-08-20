<div
    className='dropdown-menu megamenu border border-secondary shadow'
    style={{ borderRadius: '4px' }}
    role='menu'
    >
    <div className='row g-6' style={{ width: '60rem' }}>
        {category &&
            category.map((cat) => (
                <div className='col-lg-4 col-8 text-center pt-2 pb-2'>
                <div className='col-megamenu container_link_color'>
                    <LinkContainer
                        to={`/product/${cat._id}/category`}
                        className='link_color'
                    >
                        <h6 className='title' style={{ fontSize: '0.85rem' }}>
                            {cat.name}
                        </h6>
                    </LinkContainer>
                    <ul className='list-unstyled'>
                        {Sub.length > 0 &&
                            Sub?.map((s) => (
                            <li>
                                <Link
                                    to={`/product/${s._id}/category`}
                                >
                                    {s.category === cat._id &&
                                        s.name}
                                </Link>
                            </li>
                            ))}
                    </ul>
                </div>
                </div>
            ))}
    </div>
</div>