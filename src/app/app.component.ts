import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { SearchHits } from './SearchHit.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  response: SearchHits | undefined;
  hitsOnWiki: number | undefined;
  hitsOnGithub: number | undefined;
  isWikiResponseOk: boolean | undefined;
  githubApiToken: string = '';
  keyword: string = '';
  mouseoverSubmit: boolean | undefined;
  keywordLengthWithoutSpace: number | undefined;
  formSubmitted: boolean = false;
  isGithubResponseOk: boolean | undefined;

  constructor(private searchService: SearchService) {}
  title = 'Voyado Test Application';

  async submit(formValues: any) {
    if (this.formSubmitted) return;
    this.keyword = formValues.keyword;
    this.githubApiToken = formValues.githubApiToken;
    this.response = undefined;
    if (this.validateKeyword(this.keyword)) {
      this.formSubmitted = true;
      if (this.githubApiToken == '') {
        this.githubApiToken = 'API_TOKEN_NOT_CONFIGURED';
      }
      this.response = (await this.searchService
        .getSearchResult(this.keyword, this.githubApiToken)
        .toPromise()) as SearchHits;
      if (this.response != undefined) {
        this.formSubmitted = false;
      }

      this.hitsOnWiki = this.response.wikipedia;
      this.hitsOnGithub = this.response.gitHub;
      this.isWikiResponseOk = this.response.isWikiResponseOk;
      console.log(this.isWikiResponseOk);
      this.isGithubResponseOk = this.response.isGithubResponseOk;
      console.log(this.isGithubResponseOk);
    }
  }

  validateKeyword(keyword: string): boolean {
    this.keywordLengthWithoutSpace = keyword.replace(/\s/g, '').length;

    if (this.keywordLengthWithoutSpace > 0) return true;
    return false;
  }
}
