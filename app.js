const COVID = ' https://corona-api.com/countries';

const newAPI = 'https://covidtracking.com/api/states/daily';


fetch(COVID)
	.then(res => res.json())
	.then(data => {
		let API_DATA = data.data;
		console.log(API_DATA);

		API_DATA.forEach(country => {

			// creating sidebar navigation items
			let navItemID = country.code.toLowerCase();
			
			let navItem = document.createElement('li');
			navItem.className = 'nav-item';

			let navLink = document.createElement('a');
			navLink.className = 'nav-link';
			navLink.setAttribute('id', `${navItemID}-tab`);
			navLink.setAttribute('data-toggle', 'tab');
			navLink.setAttribute('href', `#${navItemID}`);
			navLink.setAttribute('role', 'tab');
			navLink.setAttribute('aria-controls', `${navItemID}`);
			navLink.setAttribute('aria-selected', 'false');
			navLink.textContent = `${country.name}`;
			navItem.appendChild(navLink);

			let nav = document.querySelector('#myTab');

			nav.appendChild(navItem);

			nav.firstElementChild.firstElementChild.classList.add('active')

			navLink.addEventListener('click', function () {
				this.classList.remove('active');
			});


			// creating tab section with tabs connected with navLink
			let tabPane = document.createElement('div');
			tabPane.className = 'tab-pane fade';
			tabPane.setAttribute('id', `${navItemID}`);
			tabPane.setAttribute('role', 'tabpanel');
			tabPane.setAttribute('aria-labelledby', `${navItemID}-tab`);
			tabPane.innerHTML = `
				<h3>${country.name}</h3>
				<hr>
				<div class='row'>
					<div class="col-sm-12">
						<div class="crd crd--today">
							<div class="crd-bd">
								<h5>New Cases For Today</h5>
								<hr>
							</div>
							<div class="row">
								<div class="col-sm-12">
									<div class="today">
										<div class="row">
											<div class="col-sm-6">
												<div class="today-number">
													<div class="today-number__cases">
														${country.today.confirmed}
													</div>
													<h5 class="today-number__tl mb-0">${country.today.confirmed} NEW CASES FOR TODAY</h5>
												</div>
											</div>
											<div class="col-sm-6">
												<div class="today-number">
													<div class="today-number__cases">
														${country.today.deaths}
													</div>
													<h5 class="today-number__tl mb-0">${country.today.deaths} DEATH CASES FOR TODAY</h5>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-6">
						<div class="crd crd--confirmed">
              <div class="crd__icon">
                <i class="fa fa-users" aria-hidden="true"></i>
              </div>
              <div class="crd-bd">
                <p class="crd-bd__cnt">${country.latest_data.confirmed}</p>
                <h5 class="crd-bd__tl">Confirmed Cases</h5>
              </div>
            </div>
					</div>
					<div class="col-sm-6">
						<div class="crd crd--warning">
              <div class="crd__icon crd__icon--warning">
								<i class="fa fa-minus-circle" aria-hidden="true"></i>
              </div>
              <div class="crd-bd">
                <p class="crd-bd__cnt">${country.latest_data.critical}</p>
                <h5 class="crd-bd__tl">Critical</h5>
              </div>
            </div>
					</div>
					<div class="col-sm-6">
						<div class="crd crd--danger">
              <div class="crd__icon crd__icon--danger">
								<i class="fa fa-minus-circle" aria-hidden="true"></i>
              </div>
              <div class="crd-bd">
                <p class="crd-bd__cnt">${country.latest_data.deaths}</p>
                <h5 class="crd-bd__tl">Deaths</h5>
              </div>
            </div>
					</div>
					<div class="col-sm-6">
						<div class="crd crd--recovered">
              <div class="crd__icon crd__icon--recovered">
							<i class="fa fa-medkit" aria-hidden="true"></i>
              </div>
              <div class="crd-bd">
                <p class="crd-bd__cnt">${country.latest_data.recovered}</p>
                <h5 class="crd-bd__tl">Recovered Cases</h5>
              </div>
            </div>
					</div>
				</div>
			`;

			let tabContent = document.querySelector('#myTabContent');
			
			tabContent.appendChild(tabPane);

			tabContent.firstElementChild.classList.add('show', 'active');
		});
	})

	.catch(function(error) {
		console.log(error);
	})
