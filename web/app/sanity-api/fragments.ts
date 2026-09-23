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
	caption,
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
	quantity,
	tag->
`;

export const artworkCard = `
	_id,
	_type,
	slug,
	imageCover{
    ${figure}
  },
	title,
	description
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

export const moduleArtworks = `
_type == 'moduleArtworks' => {
	...,
	items[]-> {
		...
		${artworkCard}
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
		text{
			${blockContent}
		},
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
