const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const testDom1 = new JSDOM(`
  <div id="tree">
      <div class="layer " data-parents="">
          <div class="tier">
              <div class="node" key="0">First Problem</div>
          </div>
          <div class="subtier">
              <div class="layer " data-parents="0">
                  <div class="tier">
                      <div class="node" key="1">2nd Problem</div>
                      <div class="node" key="2">3rd Problem</div>
                      <div class="node" key="3">4th Problem</div>
                  </div>
                  <div class="subtier">
                      <div class="layer " data-parents="1" style="flex: 6 1 0%;">
                          <div class="tier">
                              <div class="node" key="4">5th Problem</div>
                              <div class="node" key="5">6th Problem</div>
                          </div>
                          <div class="subtier">
                              <div class="layer " data-parents="" style="flex: 6 1 0%;">
                                  <div class="tier"></div>
                                  <div class="subtier"></div>
                              </div>
                              <div class="layer " data-parents="" style="flex: 6 1 0%;">
                                  <div class="tier"></div>
                                  <div class="subtier"></div>
                              </div>
                          </div>
                      </div>
                      <div class="layer hasSharedSibling" data-parents="2" style="flex: 4 1 0%;">
                          <div class="tier">
                              <div class="node" key="6">7th Problem</div>
                              <div class="node" key="7">8th Problem</div>
                          </div>
                          <div class="subtier">
                              <div class="layer " data-parents="" style="flex: 6 1 0%;">
                                  <div class="tier"></div>
                                  <div class="subtier"></div>
                              </div>
                              <div class="layer " data-parents="" style="flex: 6 1 0%;">
                                  <div class="tier"></div>
                                  <div class="subtier"></div>
                              </div>
                          </div>
                      </div>
                      <div class="layer sharedChild" data-parents="2,3">
                          <div class="tier">
                              <div class="node" key="8">9th Problem</div>
                          </div>
                          <div class="subtier">
                              <div class="layer " data-parents="" style="flex: 6 1 0%;">
                                  <div class="tier"></div>
                                  <div class="subtier"></div>
                              </div>
                          </div>
                      </div>
                      <div class="layer hasSharedSibling" data-parents="3" style="flex: 3 1 0%;">
                          <div class="tier">
                              <div class="node" key="9">10th Problem</div>
                          </div>
                          <div class="subtier">
                              <div class="layer " data-parents="" style="flex: 6 1 0%;">
                                  <div class="tier"></div>
                                  <div class="subtier"></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
`)

export default testDom1
