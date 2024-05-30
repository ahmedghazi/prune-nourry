export const seo = `
	...,
	metaImage{
		asset->
	}
`;

export const figure = `
	...,
	image{
		asset->
	},
	link->{
		_type,
		slug
	}
`;

// export const blockContent = `
// 	...,
// 	_type == "figures" =>{
// 		items[]{
// 			${figure}
// 		}
// 	},
// 	markDefs[] {
// 		...,
// 		_type == "linkInternal" => {
// 			...,
// 			reference->,
// 		}
// 	}
// `;

export const blockContent = `
	...,
	en[]{
		...,
		markDefs[] {
			...,
			_type == "linkInternal" => {
				...,
				reference->,

			}
		}
	},
	fr[]{
		...,
		markDefs[] {
			...,
			_type == "linkInternal" => {
				...,
				reference->,
			}
		}
	}
`;

export const projetCard = `
	_id,
  _type,
  slug,
  imageCover{
    ${figure}
  },
  title,

`;

export const productCard = `
	_id,
  _type,
  slug,
  imageCover{
    ${figure}
  },
  title,
	price,
	tag->
`;

export const moduleText = `
	_type == 'moduleText' => {
		...,
		text[]{
			${blockContent}
		}
	}
`;

export const moduleImage = `
	_type == 'moduleImage' => {
		${figure}
	}
`;

export const moduleImages = `
	_type == 'moduleImages' => {
		items[] {
			${figure}
		}
	}
`;

export const moduleSlider = `
	_type == 'moduleSlider' => {
		images[] {
			${figure}
		}
	}
`;

export const moduleFeaturedProducts = `
	_type == 'moduleFeaturedProducts' => {
		...,
		items[]-> {
			${productCard}
		}
	}
`;

export const moduleProducts = `
	_type == 'moduleProducts' => {
		...,
		items[]-> {
			${productCard}
		}
	}
`;

export const moduleProjects = `
	_type == 'moduleProjects' => {
		...,
		items[]-> {
			...
			// ${productCard}
		}
	}
`;

export const moduleVideo = `
_type == 'moduleVideo' => {
	...,
	embed{
		...,
		placeholder {
			...,
			asset->
		}
	}
}
`;

export const moduleVideos = `
_type == 'moduleVideos' => {
	...,
	items[]{
		...,
		placeholder {
			...,
			asset->
		}
	}
}
`;
export const moduleArtworks = `
_type == 'moduleArtworks' => {
	...,
	items[]{
		...,
		image{
			${figure}
		},
		link{
			...,
			link->{
				_type,
				slug
			}
		},
	}
}
`;

export const modulePress = `
_type == 'modulePress' => {
	...,
	items[]{
		...,
		image{
			${figure}
		},

	}
}
`;

export const moduleExhibitions = `
_type == 'moduleExhibitions' => {
	...,
	items[]{
		...,
		slider[]{
			${figure}
		},

	}
}
`;

export const moduleEmbed = `
	_type == 'moduleEmbed' => {
		...,
		embed{
			...,
			placeholder {
				...,
				asset->
			}
		}
	}
`;

export const content = `
	...,
	items[]{
		...,
		image{
			asset->
		},

	}
`;
